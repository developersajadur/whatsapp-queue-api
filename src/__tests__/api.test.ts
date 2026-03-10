import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('API', () => {
  it('POST message endpoint success', async () => {
    const res = await request(app)
      .post('/api/v1/messages/send')
      .send({ phone: '1234567890', message: 'hello' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.data).toHaveProperty('jobId');
  });

  it('POST invalid payload returns error', async () => {
    const res = await request(app)
      .post('/api/v1/messages/send')
      .send({ phone: '123' })
      .set('Accept', 'application/json');

    expect(res.status).toBeGreaterThanOrEqual(400);
    expect(res.body).toHaveProperty('success', false);
  });
});
