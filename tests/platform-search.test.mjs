import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import Module from 'node:module';
import ts from 'typescript';
import path from 'node:path';
const filename = path.resolve('lib/connectors/search.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const mod = new Module(filename);
mod.filename = filename;
mod.paths = Module._nodeModulePaths(path.dirname(filename));
mod._compile(compiled, filename);
const { searchWeb, rankResults, mediaUrl } = mod.exports;

const result = (title, description = '', source = 'Foroshga') => ({ title, description, source, url: 'https://foroshga.com/ads/' + encodeURIComponent(title) });

test('resolves source images, unwraps image proxies, and rejects unsafe media', () => {
    const base = new URL('https://jobs.af');
    assert.equal(mediaUrl('/company.png', base), 'https://jobs.af/company.png');
    assert.equal(mediaUrl('/_next/image?url=https%3A%2F%2Fimages.example%2Flogo.png&w=3840', base), 'https://images.example/logo.png');
    assert.equal(mediaUrl('javascript:alert(1)', base), undefined);
    assert.equal(mediaUrl('data:image/svg+xml,test', base), undefined);
    assert.equal(mediaUrl('https://user:password@example.com/image', base), undefined);
});

test('ranks exact phrases before related words and description-only matches', () => {
    const ranked = rankResults('engineer', [result('Office assistant', 'Works with an engineer'), result('Engineering tools'), result('Engineer'), result('Unrelated product')]);
    assert.deepEqual(ranked.map(item => item.title), ['Engineer', 'Engineering tools', 'Office assistant']);
});

test('accepts small typos and synonyms but keeps model numbers distinct', () => {
    assert.equal(rankResults('enginer', [result('Engineer')]).length, 1);
    assert.equal(rankResults('apartment', [result('Flat for rent')]).length, 1);
    assert.equal(rankResults('iphone 14', [result('iPhone 15'), result('iPhone 14')]).length, 1);
    assert.equal(rankResults('art', [result('Apartment')]).length, 0);
});

test('normalizes Dari letters and matches English location names', () => {
    assert.equal(rankResults('كابل', [result('خانه در کابل')]).length, 1);
    assert.equal(rankResults('phone in Kabul', [result('موبایل کابل')]).length, 1);
});

test('requires query coverage, preserves job intent, and removes duplicate links', () => {
    assert.equal(rankResults('phone Kabul', [result('Phone in Herat')]).length, 0);
    assert.deepEqual(rankResults('jobs', [result('House for rent'), result('Engineer', '', 'ACBAR')]).map(item => item.title), ['Engineer']);
    const item = result('Phone');
    assert.equal(rankResults('phone', [item, item]).length, 1);
    assert.equal(rankResults('in the', [item]).length, 0);
});

test('combines native searches, limits recent listings, and reports unavailable platforms', async () => {
    const original = global.fetch;
    const calls = [];
    global.fetch = async input => {
        const url = new URL(input); calls.push(url);
        let body;
        if (url.hostname === 'www.acbar.org') body = '<header><img src="/logo.png"></header><div class="job-card"><div class="job-card__logo"><img src="https://download.acbar.org/company.png"></div><div class="job-card__company">Example Employer <span>Full time</span></div><a class="job-card__title" href="/en/jobs/details/123/engineer">Engineer</a>Kabul</div><a href="/en/jobs?search=engineer&page=2">Next</a>';
        else if (url.hostname === 'shopino24.com') body = '<div data-page="' + JSON.stringify({ props: { siteSettings: { site_logo: '/logo.png' }, products: { data: [{ name: 'Engineering book', slug: 'engineering-book', final_price: 200, image_url: '/book.jpg', vendor: { store_name: 'Bookshop', province: 'Kabul' } }], next_page_url: null } } }).replaceAll('"', '&quot;') + '"></div>';
        else if (url.hostname === 'foroshga.com') body = '<article><h3>Engineering tools</h3><img src="/tools.jpg"><a href="/ads/123"></a></article><article><h3>Untrusted</h3><a href="https://evil.example/ads/456"></a></article>';
        else if (url.hostname === 'jobs.af') body = '<div><a href="/public/job/engineer"></a><h3>Engineer</h3>Kabul</div><div><a href="/public/job/guard"></a><h3>Guard</h3></div>';
        else if (url.hostname === 'asoda.app') body = '<a href="/en/kabul/house/home-123"><h2>Home</h2></a>';
        else return new Response('Unavailable', { status: 503 });
        return new Response(body, { headers: { 'Content-Type': 'text/html' } });
    };
    try {
        const result = await searchWeb('engineer', 0, new AbortController().signal);
        assert.deepEqual(result.results.map(item => item.source).sort(), ['ACBAR', 'Foroshga', 'Jobs.af', 'Shopino24']);
        assert.equal(result.sources.length, 9);
        const job = result.results.find(item => item.source === 'ACBAR');
        assert.equal(job.company, 'Example Employer');
        assert.equal(job.companyLogo, 'https://download.acbar.org/company.png');
        assert.equal(job.url, 'https://www.acbar.org/en/jobs/details/123/engineer');
        assert.equal(job.sourceUrl, 'https://www.acbar.org');
        const product = result.results.find(item => item.source === 'Shopino24');
        assert.equal(product.image, 'https://shopino24.com/book.jpg');
        assert.equal(product.sourceLogo, 'https://shopino24.com/logo.png');
        assert.equal(product.price, '200 AFN');
        assert.equal(product.company, 'Bookshop');
        assert.equal(product.url, 'https://shopino24.com/products/engineering-book');
        assert.equal(result.results.find(item => item.source === 'Foroshga').image, 'https://foroshga.com/tools.jpg');
        assert.equal(result.more, true);
        assert.equal(result.sources.find(s => s.name === 'Dara').status, 'unavailable');
        assert.equal(result.sources.find(s => s.name === 'Asoda').status, 'limited');
        assert.equal(result.sources.find(s => s.name === 'Topsii').status, 'external');
        assert.equal(calls.length, 7);
        assert.equal(calls.find(u => u.hostname === 'www.acbar.org').searchParams.get('search'), 'engineer');
        assert.equal(calls.find(u => u.hostname === 'foroshga.com').searchParams.get('q'), 'engineer');
        calls.length = 0;
        await searchWeb('engineer', 1, new AbortController().signal);
        assert.equal(calls.length, 3);
        assert.ok(calls.every(u => u.searchParams.get('page') === '2'));
    } finally { global.fetch = original; }
});

test('source failures produce honest coverage and no fabricated results', async () => {
    const original = global.fetch;
    global.fetch = async () => { throw new Error('offline'); };
    try {
        const result = await searchWeb('phone', 0, new AbortController().signal);
        assert.equal(result.results.length, 0);
        assert.equal(result.more, false);
        assert.equal(result.sources.filter(s => s.status === 'unavailable').length, 7);
    } finally { global.fetch = original; }
});
