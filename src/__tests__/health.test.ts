import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../app';

describe('Health Endpoint', () => {
  it('should return server running', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
