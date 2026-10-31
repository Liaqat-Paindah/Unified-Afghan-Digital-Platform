import { NextResponse } from "next/server";
import { searchWeb } from "@/lib/connectors/search";
export async function GET(request: Request) {
    const params = new URL(request.url).searchParams;
    const q = (params.get("q") ?? "").trim();
    const page = Number(params.get("page") ?? 0);
    const freshness = params.get("freshness") ?? "";
    const json = (body: object, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
    if (!q || q.length > 600 || q.split(/\s+/).length > 75 || !Number.isInteger(page) || page < 0 || page > 9 || !["", "pd", "pw", "pm", "py"].includes(freshness))
        return json({ error: "Enter a valid search query of up to 600 characters and 75 words." }, 400);
    try {
        return json(await searchWeb(q, page, request.signal));
    }
    catch (error) {
        return json({ error: error instanceof Error && error.name === "Error" ? error.message : "Search timed out. Please try again." }, 502);
    }
}
