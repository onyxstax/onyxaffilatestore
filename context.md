# Project Context — onyxaffilatestore

High-level background for anyone (human or AI) coming to this project fresh.

## What This Is

A lightweight Amazon affiliate storefront. The goal is to display curated products with affiliate tracking links so that purchases made through the store generate commission via the Amazon Associates program.

## Why It Exists

Affiliate stores let content creators and small publishers monetize traffic without managing inventory, shipping, or payment processing. This project provides the minimal infrastructure needed to:

1. Show a branded product catalogue to visitors.
2. Route purchase intent through tagged Amazon URLs that credit the store owner.
3. Keep product data manageable through a simple API rather than hard-coding everything in HTML.

## Current State

The project is at an early, foundational stage:

- Static HTML storefront with placeholder product cards.
- Express backend with API key authentication exposing a `/api/products` endpoint.
- No database — product data lives directly in `server.js`.
- No Amazon PA API integration yet; affiliate URLs are manual placeholders.

## Intended Direction

Likely next steps (not committed, subject to owner decisions):

- Connect to the **Amazon Product Advertising API (PA API 5.0)** to fetch live product data (title, image, price, affiliate URL) by ASIN.
- Store curated ASINs or product lists in a config file or lightweight database.
- Improve the frontend to dynamically render products fetched from `/api/products`.
- Add categories, search, or filtering as the catalogue grows.

## Key Constraints

- **Amazon Associates rules:** Affiliate links must include a valid tracking tag (`tag=` parameter). Prices must not be displayed as static text — they must come from PA API responses or link through to Amazon for current pricing (Associates ToS requirement).
- **No build pipeline:** The frontend is plain HTML/CSS with no bundler. Keep it that way unless there is a clear reason to add one.
- **Single-file backend:** `server.js` handles everything for now. Split only when the file becomes hard to navigate.

## Glossary

| Term         | Meaning                                                                 |
|--------------|-------------------------------------------------------------------------|
| ASIN         | Amazon Standard Identification Number — unique product ID on Amazon     |
| PA API       | Amazon Product Advertising API — programmatic access to product data    |
| Tracking tag | The `tag=` value in an Amazon URL that identifies the Associates account |
| Associates   | Amazon's affiliate program (Amazon Associates)                          |
