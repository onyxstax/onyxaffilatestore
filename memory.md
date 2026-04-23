# OnyxAffiliateStore — Project Memory

## What This Is
A Node.js/Express Amazon affiliate store with API key–protected product endpoints and a static HTML storefront.

## Stack
- **Runtime:** Node.js
- **Framework:** Express 4.x
- **Env vars:** dotenv
- **Frontend:** Plain HTML/CSS (no build step)

## File Map
| File | Purpose |
|------|---------|
| `server.js` | Express server, API key middleware, `/api/products` endpoint |
| `index.html` | Static storefront UI (served without auth) |
| `package.json` | Project manifest; `npm start` / `npm run dev` |
| `.env.example` | Template for required env vars |
| `.gitignore` | Excludes `node_modules/` and `.env` |

## Running Locally
```bash
cp .env.example .env   # set API_KEY and optionally PORT
npm install
npm run dev            # node --watch for live reload
```
Server starts on `http://localhost:3000` (or `$PORT`).

## Authentication
- All `/api/*` routes require a valid API key.
- Pass via header `X-API-Key: <key>` or query param `?api_key=<key>`.
- Static files (`index.html`, CSS, images) are served without auth.
- Server exits at startup if `API_KEY` env var is not set.

## Current API Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/products` | Required | Returns hardcoded list of 3 products with Amazon affiliate URLs |

## Environment Variables
| Variable | Required | Default | Notes |
|----------|----------|---------|-------|
| `API_KEY` | Yes | — | Server refuses to start without this |
| `PORT` | No | `3000` | Listening port |

## Key Decisions & Notes
- Static files are served from the project root via `express.static(__dirname)` — no `public/` subfolder.
- The `/api` middleware mount applies `requireApiKey` to all sub-routes, so new `app.get('/api/...')` routes are automatically protected.
- Products are currently hardcoded in `server.js`; a database layer is the obvious next step.
- The HTML storefront (`index.html`) still uses placeholder affiliate links — these need to be wired to real Amazon affiliate tags.

## What's Missing / Next Steps
- Real product data (database or CMS integration)
- Amazon affiliate tag (`?tag=your-tag`) set to an actual tag in `server.js`
- Frontend JS to fetch `/api/products` and render cards dynamically
- Deployment configuration (Docker, CI/CD)
- README for onboarding
