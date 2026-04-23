# Agents Guide — onyxaffilatestore

This file describes the project for AI coding agents (e.g. Claude Code). Read it before making changes.

## Project Overview

Amazon affiliate storefront focused on **health and self-wellness products**. The server exposes product data through authenticated API routes; the frontend renders products as a simple storefront page.

**Amazon Associates tracking tag:** `onyx01a-20` — use this tag in every affiliate URL. Format: `https://www.amazon.com/dp/<ASIN>/?tag=onyx01a-20`

## Repository Layout

```
.
├── server.js        # Express server — API routes, auth middleware, static serving
├── index.html       # Static storefront (vanilla HTML/CSS, no build step)
├── package.json     # Dependencies: express, dotenv
├── .env.example     # Environment variable template
└── .gitignore       # Ignores node_modules/ and .env
```

No subdirectories. All application code lives at the root.

## Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Runtime  | Node.js             |
| Backend  | Express 4.x         |
| Frontend | Vanilla HTML/CSS    |
| Config   | dotenv              |

## Running the Project

1. Copy `.env.example` to `.env` and set `API_KEY` to a strong secret value.
2. Install dependencies: `npm install`
3. Start the server:
   - Production: `npm start` → `node server.js`
   - Development (auto-reload): `npm run dev` → `node --watch server.js`
4. The server listens on `PORT` (default `3000`). Open `http://localhost:3000`.

The server will refuse to start if `API_KEY` is not set.

## Environment Variables

| Variable  | Required | Default | Description                        |
|-----------|----------|---------|------------------------------------|
| `API_KEY` | yes      | —       | Secret key protecting `/api/*`     |
| `PORT`    | no       | `3000`  | TCP port the server listens on     |

## API Authentication

All routes under `/api/*` require a valid API key. Pass it either way:

- HTTP header: `X-API-Key: <key>`
- Query parameter: `?api_key=<key>`

Requests with a missing or incorrect key receive `401 Unauthorized`.

Public routes (the static storefront at `/`) require no authentication.

## API Endpoints

| Method | Path           | Auth | Description                  |
|--------|----------------|------|------------------------------|
| GET    | `/`            | no   | Serves `index.html`          |
| GET    | `/api/products`| yes  | Returns the product list     |

### `GET /api/products` response shape

```json
{
  "products": [
    { "id": 1, "name": "Product 1", "affiliateUrl": "https://www.amazon.com/?tag=your-tag" }
  ]
}
```

## Extending the Project

- **Add an API endpoint:** Register a new route in `server.js` under the `/api` namespace. The `requireApiKey` middleware is applied to the entire `/api` prefix, so new routes are automatically protected.
- **Update the storefront:** Edit `index.html`. There is no build pipeline; changes are served immediately on the next request.
- **Add dependencies:** `npm install <package>` and `require` it in `server.js`.
- **Replace placeholder products:** Update the array in the `GET /api/products` handler, or replace it with a database/external API call. All products should be health and self-wellness related. Always use the tracking tag `onyx01a-20` in affiliate URLs.

## Code Conventions

- CommonJS (`require`/`module.exports`), not ESM.
- No TypeScript. No linter or formatter is configured.
- No tests exist yet. When adding tests, place them in a `test/` directory and use a standard Node test runner (e.g. `node:test` or Jest).
- Keep middleware functions in `server.js` unless the file grows large enough to warrant splitting.

## How the Owner Thinks (Agent Behaviour)

These preferences come directly from the project owner. Follow them on every task.

**Planning:** Features are planned by talking through the approach before any code is written. If a task is non-trivial, summarise the plan in plain language and confirm the direction before starting.

**Decision-making:** Make the call and report what you did. Don't ask permission for routine decisions. For anything large — changing the architecture, adding a new dependency, restructuring files, or any action that could affect code on the owner's local machine — stop and ask for explicit consent first.

**Code quality, in order of priority:**
1. Works correctly — no half-broken implementations shipped.
2. Clean and reliable — code should be trustworthy and maintainable.
3. Readable — a fresh reader should understand it without explanation.
4. Simple — no extras, no abstractions that aren't earned yet.
5. Elegant ("sexy when possible") — if the clean solution is also the beautiful one, choose it.

**What never to do without asking:**
- Any change that would modify files on the owner's personal laptop (local filesystem outside this repo).
- Any action with wide blast radius that can't easily be undone.

## Security Notes

- Never commit `.env` — it is listed in `.gitignore`.
- `API_KEY` should be a long random string (e.g. 32+ hex characters). The `.env.example` placeholder must be replaced before deployment.
- The static directory served by `express.static` is the project root (`__dirname`). Avoid placing sensitive files (private keys, secrets) in the root directory.
