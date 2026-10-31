"use client";
import { Globe2, Search, X, Loader2, ArrowLeft, ArrowRight, ArrowUpRight, SearchX, Building2, ImageOff, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { SearchResponse } from "@/lib/connectors/search";
type State = {
    q: string;
    page: number;
};
export default function HomePage() {
    const [input, setInput] = useState("");
    const [state, setState] = useState<State>({ q: "", page: 0 });
    const [data, setData] = useState<SearchResponse | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const restore = () => { const p = new URLSearchParams(location.search); const page = Number(p.get("page") ?? 0); const q = (p.get("q") ?? "").slice(0, 600); setInput(q); setState({ q, page: Number.isInteger(page) && page >= 0 && page <= 9 ? page : 0 }); };
        restore();
        window.addEventListener("popstate", restore);
        return () => window.removeEventListener("popstate", restore);
    }, []);
    useEffect(() => {
        if (!state.q)
            return;
        const controller = new AbortController();
        async function load() {
            setLoading(true);
            setData(null);
            setError("");
            try {
                const params = new URLSearchParams({ q: state.q, page: String(state.page) });
                const response = await fetch("/api/search?" + params, { signal: controller.signal, headers: { Accept: "application/json" } });
                if (response.redirected || !response.headers.get("content-type")?.includes("application/json"))
                    throw new Error("Search is temporarily unavailable. Please try again shortly.");
                let result: SearchResponse;
                try {
                    result = await response.json();
                } catch {
                    throw new Error("Search returned an invalid response. Please try again shortly.");
                }
                if (!result || typeof result !== "object")
                    throw new Error("Search returned an invalid response. Please try again shortly.");
                if (!response.ok)
                    throw new Error(result.error ?? "Unable to search.");
                if (!Array.isArray(result.results) || typeof result.elapsed !== "number" || typeof result.more !== "boolean" || !Array.isArray(result.sources))
                    throw new Error("Search returned an invalid response. Please try again shortly.");
                if (!controller.signal.aborted)
                    setData(result);
            }
            catch (e) {
                if (!controller.signal.aborted)
                    setError(e instanceof Error ? e.message : "Unable to connect.");
            }
            finally {
                if (!controller.signal.aborted)
                    setLoading(false);
            }
        }
        void load();
        return () => controller.abort();
    }, [state]);
    function search(q: string, page = 0) {
        q = q.trim();
        if (!q)
            return;
        const params = new URLSearchParams({ q });
        if (page)
            params.set("page", String(page));
        window.history.pushState(null, "", "/?" + params);
        setInput(q);
        setState({ q, page });
    }
    const unavailable = data?.sources.every(source => source.status === "unavailable" || source.status === "external");
    return (
        <main className="min-h-[75vh] bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-100">
            <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-20 sm:pt-28">
                <div className="mb-9 text-center">
                    <p className="mb-5 text-sm font-medium text-emerald-700 dark:text-emerald-400">Discover Afghanistan. Explore the web.</p>
                    <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">One<span className="text-emerald-600">Search.</span></h1>
                    <p className="mt-5 text-slate-500">A world of information. One place to find it.</p>
                </div>
                <form role="search" onSubmit={e => { e.preventDefault(); search(input); }} className="mx-auto max-w-2xl flex items-center gap-3 rounded-full border border-slate-300 bg-white px-5 py-3 shadow-sm focus-within:shadow-lg hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
                    <Search className="size-5 shrink-0 text-slate-400" />
                    <label htmlFor="web-search" className="sr-only">Search Afghan platforms</label>
                    <input id="web-search" type="search" required maxLength={600} value={input} onChange={e => setInput(e.target.value)} placeholder="Search anything…" className="min-w-0 flex-1 bg-transparent py-1 outline-none [&::-webkit-search-cancel-button]:appearance-none" />
                    {input && <button type="button" aria-label="Clear search" onClick={() => { setInput(""); document.getElementById("web-search")?.focus(); }} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-emerald-600 dark:hover:bg-slate-800"><X className="size-5" /></button>}
                    <button aria-label="Search" type="submit" className="rounded-full bg-emerald-700 p-2 text-white hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"><Search className="size-5" /></button>
                </form>
                {!state.q ? (
                    <div className="mt-7 pb-24 text-center">
                        <p className="text-xs text-slate-400">EXPLORE SOMETHING NEW</p>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {["Jobs in Kabul", "Afghanistan news", "Apartments in Kabul", "Afghan businesses"].map(q => <button key={q} onClick={() => search(q)} className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-500 hover:border-emerald-600 hover:text-emerald-700 dark:border-slate-700 dark:text-slate-300">{q}</button>)}
                        </div>
                        <p className="mt-12 text-sm text-slate-400">Jobs, places, products, and answers — across the web.</p>
                    </div>
                ) : (
                    <section aria-label="Search results" aria-busy={loading} className="mx-auto mt-9 max-w-3xl pb-20">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
                            <h2 className="flex items-center gap-2 text-sm font-semibold"><Globe2 className="size-4 text-emerald-600" />Search results</h2>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">Best matches first</span>
                        </div>
                        <div role="status" aria-live="polite" className="py-4 text-sm text-slate-500 dark:text-slate-400">
                            {loading ? <span className="flex items-center gap-2"><Loader2 className="size-4 animate-spin" />Finding relevant results…</span> : data ? <span>{data.results.length} {data.results.length === 1 ? "match" : "matches"} on this page <span aria-hidden="true" className="px-1">·</span> {data.elapsed.toFixed(1)} seconds</span> : null}
                        </div>
                        {loading && <div aria-hidden="true" className="space-y-4">{[0, 1, 2].map(i => <div key={i} className="rounded-2xl border border-slate-100 p-6 motion-safe:animate-pulse dark:border-slate-800"><div className="mb-5 h-8 w-32 rounded-lg bg-slate-100 dark:bg-slate-800" /><div className="h-5 w-3/4 rounded bg-slate-100 dark:bg-slate-800" /><div className="mt-3 h-3 w-full rounded bg-slate-100 dark:bg-slate-800" /><div className="mt-2 h-3 w-2/3 rounded bg-slate-100 dark:bg-slate-800" /></div>)}</div>}
                        {error && <div role="alert" className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200"><h3 className="font-semibold">Search is temporarily unavailable</h3><p className="mt-2 text-sm">{error}</p><button onClick={() => setState({ ...state })} className="mt-4 rounded-lg border border-amber-300 px-4 py-2 text-sm font-medium hover:bg-amber-100 dark:hover:bg-amber-900">Try again</button></div>}
                        <div className="space-y-4">
                            {data?.results.map(result => {
                                const url = new URL(result.url);
                                return (
                                    <article key={result.url} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-slate-200/40 focus-within:border-emerald-500 sm:rounded-3xl dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-emerald-800 dark:hover:shadow-none">
                                        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5 sm:px-6 dark:border-slate-800">
                                            <a href={result.sourceUrl || url.origin} aria-label={`Visit ${result.source} website`} className="flex min-w-0 items-center gap-2.5 rounded-lg hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-600">
                                                <ResultMedia key={result.sourceLogo} src={result.sourceLogo} alt={`${result.source} logo`} variant="source" />
                                                <span className="truncate text-xs font-semibold">{result.source}</span>
                                                <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0 text-slate-400" />
                                            </a>
                                            {result.category && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{result.category}</span>}
                                        </div>
                                        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:gap-6 sm:p-6">
                                            {result.image && <a href={result.url} aria-label={`View ${result.title}`} className="block shrink-0 overflow-hidden rounded-xl bg-slate-50 focus-visible:outline-2 focus-visible:outline-emerald-600 sm:w-44 dark:bg-slate-800"><ResultMedia key={result.image} src={result.image} alt={result.title} variant="listing" contain={result.category === "Product"} /></a>}
                                            <div className="min-w-0 flex-1">
                                                {(result.company || result.companyLogo) && <div className="mb-3 flex items-center gap-2.5"><ResultMedia key={result.companyLogo} src={result.companyLogo} alt={`${result.company || "Company"} logo`} variant="company" /><span dir="auto" className="min-w-0 truncate text-sm font-medium text-slate-600 dark:text-slate-300">{result.company || "Employer"}</span></div>}
                                                <h3 dir="auto" className="break-words text-lg font-semibold leading-7 tracking-tight text-slate-900 sm:text-xl dark:text-slate-100"><a href={result.url} className="rounded-sm hover:text-emerald-700 hover:underline focus-visible:outline-2 focus-visible:outline-emerald-600 dark:hover:text-emerald-400"><HighlightedText text={result.title} query={state.q} /></a></h3>
                                                {result.description && <p dir="auto" className="mt-2 line-clamp-2 break-words text-sm leading-6 text-slate-500 dark:text-slate-400"><HighlightedText text={result.description} query={state.q} /></p>}
                                                {(result.price || result.location) && <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">{result.price && <span className="text-base font-semibold text-emerald-700 dark:text-emerald-400">{result.price}</span>}{result.location && <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"><MapPin aria-hidden="true" className="size-3.5" /><span dir="auto" className="capitalize">{result.location}</span></span>}</div>}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50/70 px-5 py-3.5 sm:px-6 dark:bg-slate-900/60">
                                            <a href={result.sourceUrl || url.origin} className="text-xs text-slate-500 underline-offset-4 hover:text-emerald-700 hover:underline dark:text-slate-400">Visit {url.hostname.replace(/^www\./, "")}</a>
                                            <a href={result.url} className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">{result.category === "Job" ? "View job" : "View listing"}<ArrowUpRight aria-hidden="true" className="size-3.5" /></a>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                        {data && !data.results.length && <div className="rounded-2xl border border-dashed border-slate-200 px-6 py-12 text-center dark:border-slate-800"><SearchX className="mx-auto mb-4 size-8 text-slate-400" /><h3 className="break-words text-lg font-semibold">{unavailable ? "We could not reach the listings" : <>No matches for “{state.q}”</>}</h3><p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">{unavailable ? "The listing sites are temporarily unavailable. Please try again shortly." : "Try a shorter phrase, check the spelling, or use a job title, product name, or location."}</p><button onClick={() => { if (unavailable) setState({ ...state }); else document.getElementById("web-search")?.focus(); }} className="mt-5 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800">{unavailable ? "Try again" : "Refine search"}</button></div>}
                        {data && (state.page > 0 || data.more) && <nav aria-label="Results pages" className="mt-8 flex items-center justify-between gap-2 border-t border-slate-200 pt-6 dark:border-slate-800"><button disabled={state.page === 0} onClick={() => search(state.q, state.page - 1)} className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-700 dark:hover:bg-slate-900"><ArrowLeft className="size-4" />Previous</button><span className="text-xs text-slate-500 sm:text-sm">Page {state.page + 1}</span><button disabled={!data.more} onClick={() => search(state.q, state.page + 1)} className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-30 dark:border-slate-700 dark:hover:bg-slate-900">Next<ArrowRight className="size-4" /></button></nav>}
                    </section>
                )}
            </div>
        </main>
    );
}

function ResultMedia({ src, alt, variant, contain = false }: { src?: string; alt: string; variant: "source" | "company" | "listing"; contain?: boolean }) {
    const [failed, setFailed] = useState(false);
    const listing = variant === "listing";
    const dimensions = listing ? "h-48 w-full sm:h-40" : variant === "source" ? "size-7" : "size-9";
    return <span className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ${dimensions} ${listing ? "" : "border border-slate-100 p-1 dark:border-slate-700"}`}>
        {src && !failed ? <Image src={src} alt={alt} width={listing ? 352 : 64} height={listing ? 320 : 64} unoptimized loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} className={`h-full w-full ${!listing || contain ? "object-contain" : "object-cover"}`} /> : listing ? <span className="flex flex-col items-center gap-2 text-xs text-slate-400"><ImageOff aria-hidden="true" className="size-6" />Image unavailable</span> : variant === "company" ? <Building2 aria-label={alt} className="size-5 text-slate-400" /> : <Globe2 aria-label={alt} className="size-4 text-slate-400" />}
    </span>;
}

function HighlightedText({ text, query }: { text: string; query: string }) {
    const terms = [...new Set(query.split(/[^\p{L}\p{N}]+/u).filter(term => term.length > 2))].slice(0, 16);
    if (!terms.length) return text;
    const pattern = new RegExp("(" + terms.join("|") + ")", "giu");
    return text.split(pattern).map((part, index) => index % 2 ? <mark key={index} className="rounded-sm bg-emerald-50 text-inherit dark:bg-emerald-900/40">{part}</mark> : part);
}
