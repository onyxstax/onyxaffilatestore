'use strict';

const { describe, it, before } = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

process.env.API_KEY = 'test-key';
const app = require('../server');

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { status: 'ok' });
  });
});

describe('GET /api/products', () => {
  it('returns 401 with no API key', async () => {
    const res = await request(app).get('/api/products');
    assert.equal(res.status, 401);
  });

  it('returns 401 with wrong API key', async () => {
    const res = await request(app).get('/api/products').set('X-API-Key', 'wrong');
    assert.equal(res.status, 401);
  });

  it('returns 200 with valid header key', async () => {
    const res = await request(app).get('/api/products').set('X-API-Key', 'test-key');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body.products));
  });

  it('returns 200 with valid query key', async () => {
    const res = await request(app).get('/api/products?api_key=test-key');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body.products));
  });
});
