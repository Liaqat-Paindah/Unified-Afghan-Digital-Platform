import { load } from "cheerio";

export type SearchResult = {
    title: string; url: string; description: string; source: string;
    sourceUrl?: string; sourceLogo?: string; company?: string; companyLogo?: string;
    image?: string; price?: string; location?: string; category?: string;
};
export type SourceStatus = { name: string; url: string; status: "searched" | "limited" | "unavailable" | "external"; message: string };
export type SearchResponse = { results: SearchResult[]; sources: SourceStatus[]; more: boolean; elapsed: number; error?: string };

const platforms = [
    { name: "Jobs.af", url: "https://jobs.af", kind: "recent" },
    { name: "ACBAR", url: "https://www.acbar.org/en/jobs", kind: "search" },
    { name: "Shopino24", url: "https://shopino24.com/search", kind: "search" },
    { name: "Foroshga", url: "https://foroshga.com/search", kind: "search" },
    { name: "Leelam", url: "https://leelam.af", kind: "recent" },
    { name: "Asoda", url: "https://asoda.app/en/afghanistan", kind: "recent" },
    { name: "Dara", url: "https://dara.af/en", kind: "recent" },
    { name: "Topsii", url: "https://play.google.com/store/apps/details?id=com.topsii.app", kind: "app" },
    { name: "Biachat", url: "https://biachat.com", kind: "community" },
] as const;
const clean = (text: string) => text.replace(/\s+/g, " ").trim();
const normalize = (text: string) => text.normalize("NFKC").toLocaleLowerCase().replace(/ي/g, "ی").replace(/ك/g, "ک").replace(/[\u064B-\u065F\u0670\u0640]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const stopWords = new Set(["in", "at", "the", "for", "and", "a", "an", "of", "to", "در", "و", "برای"]);
const synonymGroups = [
    ["job", "jobs", "vacancy", "vacancies", "وظیفه", "وظایف"],
    ["phone", "phones", "mobile", "موبایل", "تلفن"],
    ["apartment", "apartments", "flat", "flats", "آپارتمان", "اپارتمان"],
    ["car", "cars", "vehicle", "vehicles", "موتر", "ماشین"],
    ["house", "houses", "home", "homes", "خانه"],
    ["kabul", "کابل"], ["herat", "هرات"], ["rent", "rental", "کرایه", "اجاره"],
];
const words = (text: string) => normalize(text).split(/\s+/).filter(Boolean);

export function mediaUrl(value: string | undefined, base: URL): string | undefined {
    if (!value) return;
    try {
        let target = new URL(value, base);
        // Use the original image rather than another site's oversized Next.js proxy URL.
        if (target.origin === base.origin && target.pathname === "/_next/image" && target.searchParams.has("url"))
            target = new URL(target.searchParams.get("url")!, base);
        if (target.protocol === "https:" && !target.username && !target.password) return target.href;
    } catch { /* Missing or malformed source media uses the UI fallback. */ }
}
// A small edit-distance allowance accepts typos without matching different model numbers.
function closeWord(a: string, b: string) {
    if (a.length < 4 || b.length < 4 || /\d/.test(a + b)) return false;
    const limit = a.length >= 8 ? 2 : 1;
    if (Math.abs(a.length - b.length) > limit) return false;
    let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
        const current = [i];
        for (let j = 1; j <= b.length; j++) current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + Number(a[i - 1] !== b[j - 1]));
        if (Math.min(...current) > limit) return false;
        previous = current;
    }
    return previous[b.length] <= limit;
}

export function rankResults(query: string, candidates: SearchResult[]): SearchResult[] {
    const tokens = [...new Set(words(query).filter(word => !stopWords.has(word)))];
    if (!tokens.length) return [];
    const phrase = normalize(query);
    const seen = new Set<string>();
    return candidates.map((item, index) => {
        const title = words(item.title);
        const description = words(item.description);
        // Slugs can contain English names when the displayed title is in Dari.
        let slug = "";
        try { slug = decodeURIComponent(new URL(item.url).pathname); } catch { /* Use visible text only. */ }
        const context = words([item.description, item.company, item.location, item.price, slug].filter(Boolean).join(" "));
        if (["Jobs.af", "ACBAR"].includes(item.source)) context.push("job", "jobs");
        let matched = 0, score = 0;
        for (const token of tokens) {
            const aliases = synonymGroups.find(group => group.includes(token)) ?? [token];
            let weight = title.includes(token) ? 12 : description.includes(token) ? 5 : context.includes(token) ? 3 : 0;
            if (!weight && aliases.some(alias => title.includes(alias))) weight = 8;
            if (!weight && aliases.some(alias => context.includes(alias))) weight = 3;
            if (!weight && title.some(word => token.length >= 5 && word.startsWith(token) && word.length - token.length <= 4)) weight = 6;
            if (!weight && title.some(word => closeWord(token, word))) weight = 4;
            if (!weight && context.some(word => closeWord(token, word))) weight = 1;
            if (weight) { matched++; score += weight; }
        }
        const coverage = matched / tokens.length;
        if (normalize(item.title) === phrase) score += 50;
        else if ((" " + normalize(item.title) + " ").includes(" " + phrase + " ")) score += 25;
        score += coverage * 30;
        return { item, index, score, coverage };
    }).filter(({ item, coverage }) => {
        if (coverage < (tokens.length <= 2 ? 1 : 0.65) || seen.has(item.url)) return false;
        seen.add(item.url);
        return true;
    }).sort((a, b) => b.coverage - a.coverage || b.score - a.score || a.index - b.index).map(({ item }) => item);
}

export async function searchWeb(q: string, page: number, signal: AbortSignal): Promise<SearchResponse> {
    const start = Date.now();
    const batches = await Promise.all(platforms.map(async platform => {
        const url = new URL(platform.url);
        if (platform.kind === "search") {
            url.searchParams.set(platform.name === "ACBAR" ? "search" : "q", q);
            url.searchParams.set("page", String(page + 1));
        }
        const source: SourceStatus = { name: platform.name, url: url.href, status: "searched", message: "Searched live listings" };
        const results: SearchResult[] = [];
        let more = false;
        if (platform.kind === "app" || platform.kind === "community") {
            source.status = "external";
            source.message = platform.kind === "app" ? "Open the Topsii app to search its services." : "Public listing search is not available; open Biachat to explore.";
            return { source, results, more };
        }
        if (platform.kind === "recent" && page > 0) {
            source.status = "limited";
            source.message = "Recent public listings were checked on page 1; full-site search is not connected.";
            return { source, results, more };
        }
        try {
            const response = await fetch(url, { cache: "no-store", redirect: "error", signal: AbortSignal.any([signal, AbortSignal.timeout(10000)]), headers: { Accept: "text/html", "User-Agent": "OneSearch/1.0" } });
            if (!response.ok) throw new Error("Source unavailable");
            // Bound source responses to avoid unbounded parsing and memory use.
            const reader = response.body?.getReader();
            if (!reader) throw new Error("Empty response");
            const decoder = new TextDecoder();
            let html = "", bytes = 0;
            try {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    bytes += value.byteLength;
                    if (bytes > 3_000_000) throw new Error("Source response too large");
                    html += decoder.decode(value, { stream: true });
                }
                html += decoder.decode();
            } finally { await reader.cancel(); }
            const $ = load(html);
            let sourceLogo = mediaUrl($('header img[src], img[alt="ACBAR"], img[alt="Jobs.af Logo"], img[alt="Asoda"]').first().attr("src") || $('link[rel="icon"], link[rel="shortcut icon"]').first().attr("href"), url);
            $("script,style,button,svg").remove();
            const add = (title: string, href: string, description: string, details: Partial<SearchResult> = {}) => {
                const target = new URL(href, url);
                if (target.origin !== url.origin || !["https:", "http:"].includes(target.protocol)) return;
                title = clean(title);
                description = clean(description).slice(0, 450);
                if (!title) return;
                results.push({ ...details, title, url: target.href, description, source: platform.name, sourceUrl: url.origin, sourceLogo });
            };
            if (platform.name === "Shopino24") {
                const raw = $("[data-page]").attr("data-page");
                if (!raw) throw new Error("Listings not readable");
                const props = JSON.parse(raw).props;
                sourceLogo = mediaUrl(props.siteSettings?.site_logo, url) || sourceLogo;
                const data = props.products as { data: { name: string; slug: string; final_price?: number; image_url?: string; image?: string; category?: { name?: string }; vendor?: { store_name?: string; province?: string; logo?: string } }[]; next_page_url?: string | null };
                if (!Array.isArray(data?.data)) throw new Error("Listings not readable");
                for (const item of data.data) add(item.name, "/products/" + encodeURIComponent(item.slug), [item.category?.name, item.vendor?.store_name].filter(Boolean).join(" · "), {
                    image: mediaUrl(item.image_url || item.image, url), company: item.vendor?.store_name,
                    companyLogo: mediaUrl(item.vendor?.logo, url), location: item.vendor?.province,
                    price: item.final_price != null ? `${item.final_price.toLocaleString("en-US")} AFN` : undefined, category: "Product",
                });
                more = Boolean(data.next_page_url);
            } else if (platform.name === "ACBAR") {
                $(".job-card").each((_, element) => {
                    const card = $(element), link = card.find("a.job-card__title");
                    if (link.attr("href")) add(link.text(), link.attr("href")!, clean(card.find(".job-card__company").text()) + " · " + clean(card.find(".job-card__meta").text()), {
                        company: clean(card.find(".job-card__company").clone().children().remove().end().text()),
                        companyLogo: mediaUrl(card.find(".job-card__logo img").attr("src"), url),
                        location: clean(card.find(".job-card__meta .job-pill").first().text()), category: "Job",
                    });
                });
                more = $("a[href]").toArray().some(element => { const next = new URL($(element).attr("href")!, url); return next.pathname === url.pathname && Number(next.searchParams.get("page")) === page + 2; });
            } else if (platform.name === "Foroshga") {
                $("article").each((_, element) => {
                    const card = $(element), link = card.find('a[href*="/ads/"]').first();
                    if (link.attr("href") && /\/ads\/\d+$/.test(link.attr("href")!)) add(card.find("h3").text(), link.attr("href")!, card.text(), {
                        image: mediaUrl(card.find("img").first().attr("src") || card.find("img").first().attr("data-src"), url),
                        price: clean(card.find(".listings-card__footer p").first().text()) || undefined,
                        location: clean(card.find(".listings-card__footer .truncate").first().text()) || undefined, category: "Marketplace",
                    });
                });
                more = Boolean($('a[rel="next"]').length);
            } else {
                const selectors = platform.name === "Jobs.af" ? 'a[href^="/public/job/"]' : platform.name === "Asoda" ? 'a[href^="/en/"]' : 'a[href*="/product"]';
                let readable = 0;
                $(selectors).each((_, element) => {
                    const link = $(element), href = link.attr("href")!;
                    if (platform.name === "Asoda" && !/\/en\/[^/]+\/[^/]+\/[^/]+-\d+$/.test(href)) return;
                    const card = platform.name === "Jobs.af" ? link.parent() : link;
                    const title = card.find("h2,h3").first().text() || link.attr("aria-label") || link.text();
                    if (!clean(title)) return;
                    readable++;
                    const isJob = platform.name === "Jobs.af";
                    const photo = card.find("img").first();
                    add(title, href, card.text(), {
                        image: isJob ? undefined : mediaUrl(photo.attr("src") || photo.attr("data-src"), url),
                        companyLogo: isJob ? mediaUrl(photo.attr("src"), url) : undefined,
                        company: isJob ? clean((photo.attr("alt") || "").replace(/\s*company logo\s*$/i, "")) || undefined : undefined,
                        category: isJob ? "Job" : platform.name === "Asoda" ? "Property" : "Product",
                    });
                });
                if (!readable) throw new Error("Listings not readable");
                source.status = "limited";
                source.message = "Matched against recent public listings only; full-site search is not connected.";
            }
        } catch {
            if (signal.aborted) throw signal.reason;
            source.status = "unavailable";
            source.message = "Could not read public listings right now. Open the platform directly or try again.";
        }
        return { source, results, more };
    }));
    const seen = new Set<string>();
    // Interleave platforms so the first source cannot crowd out the others.
    const results: SearchResult[] = [];
    const length = Math.max(...batches.map(batch => batch.results.length));
    for (let i = 0; i < length; i++) for (const batch of batches) {
        const item = batch.results[i];
        if (item && !seen.has(item.url)) { seen.add(item.url); results.push(item); }
    }
    return { results: rankResults(q, results), sources: batches.map(batch => batch.source), more: page < 9 && batches.some(batch => batch.more), elapsed: (Date.now() - start) / 1000 };
}
