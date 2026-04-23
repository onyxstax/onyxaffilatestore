# Skills

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Frontend**: Vanilla HTML/CSS (static, no build step)
- **Config**: dotenv (`.env` file)

## Project Overview

Amazon affiliate storefront with a static HTML frontend and a lightweight Express API backend. API routes are protected by an API key sent via the `X-API-Key` header or `?api_key=` query parameter.

## Key Files

| File | Purpose |
|------|---------|
| `server.js` | Express server — static file serving, API key middleware, `/api/products` route |
| `index.html` | Static storefront — product listings with affiliate links |
| `package.json` | Dependencies (`express`, `dotenv`) and npm scripts |
| `.env.example` | Template for required environment variables |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Port the server listens on (default: `3000`) |
| `API_KEY` | Secret key required for all `/api/*` requests |

## Running the Project

```bash
cp .env.example .env   # set API_KEY (and optionally PORT)
npm install
npm start              # production
npm run dev            # development (auto-restarts on file changes)
```

## API

### Authentication

All `/api/*` routes require a valid API key, passed as:
- Header: `X-API-Key: <key>`
- Query param: `?api_key=<key>`

Unauthorized requests receive `401 Unauthorized`.

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/products` | Returns a list of affiliate products |

## Development Notes

- The static frontend (`index.html`) is served publicly — no auth required.
- Amazon affiliate tag should be set in `server.js` (replace `your-tag` in the `affiliateUrl` values).
- Product data is currently hardcoded in `server.js`; extend with a database or external source as needed.
