# Unified Afghan Digital Platform

The Unified Afghan Digital Platform is a Next.js application prototype for
searching opportunities, services, products and other information through one
central interface.

## Platform search

OneSearch displays results inside the homepage and keeps the search bar in place.
It fetches public listings directly; it does not redirect queries to Google or
require a Brave API key.

- ACBAR, Shopino24 and Foroshga: live native query search and pagination.
- Jobs.af and Asoda: query matching against recent public listings on page 1.
- Leelam and Dara: public listing retrieval is attempted, but sources that block
  requests or do not expose readable listings cannot contribute results.
- Topsii and Biachat: public listing search is not connected.

Results show platform logos, employer logos and listing photos when provided by
the source, plus available prices and locations. Images load lazily and use a
fallback if unavailable. Listing titles, photos and explicit View listing/View job
actions navigate in the same tab; each card also links to the source website.
Ranking favors exact titles and phrases, then word matches, selected English/Dari
synonyms, and small spelling differences. Numeric model identifiers require exact
matches. Unrelated results and duplicate links are removed. Ranking applies to
the candidates retrieved on each page, not the platforms' entire catalogs.
Source status is retained in the API; the homepage does not show a coverage panel.
One failed platform does not hide results from the others. Source requests have
10-second timeouts and a 3 MB response limit. Results depend on public source
availability and markup. Date filtering is not offered because the connectors do
not consistently expose publication dates. No private account data is accessed.

Run connector checks with `node --test tests/platform-search.test.mjs`.

## Tech stack

- Next.js
- React and TypeScript
- Zustand
- Tailwind CSS
- Lucide React

## Development

```bash
npm install
npm run dev
```

## Docker

The application requires the server-side values in `.env` at runtime. Do not
put `JWT_SECRET` or other credentials in the Dockerfile or bake them into the
image.

Start the application with Docker Compose:

```bash
docker compose up -d --build
```

For an existing image, pass the environment file when starting the container:

```bash
docker run -d --name unified-afghan-digital-platform --env-file .env -p 3000:3000 unified-afghan-digital-platform
```
