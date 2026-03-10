import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../app';

describe('Rate Limit', () => {
  it('should allow request under limit', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
  });
});
