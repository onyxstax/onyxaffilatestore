# Onyxaffilatestore

Amazon affiliate storefront with an authenticated product API.

## Stack

- **Backend:** Node.js + Express
- **Frontend:** Static HTML/CSS (vanilla)
- **Config:** dotenv

## Setup

```bash
cp .env.example .env
# Fill in API_KEY (and optionally PORT) in .env
npm install
```

## Running

| Command | Description |
|---------|-------------|
| `npm start` | Start server (production) |
| `npm run dev` | Start server with file watching |

Default port: **3000**

## Architecture

| File | Purpose |
|------|---------|
| `server.js` | Express app — serves static files and `/api/*` routes |
| `index.html` | Public storefront with affiliate product links |
| `.env` | Local secrets (not committed) |
| `.env.example` | Template for required env vars |

## API

`GET /api/products`

Requires authentication via either:
- `X-API-Key: <key>` header
- `?api_key=<key>` query parameter

The `API_KEY` environment variable must be set before the server will start.
