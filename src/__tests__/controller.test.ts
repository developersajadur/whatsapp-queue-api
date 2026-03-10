/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { messageController } from '../app/controllers/message.controller';

describe('Queue / Controller', () => {
  it('job added to queue and job options applied', async () => {
    const req: any = { body: { phone: '1234567890', message: 'hi' } };
    const res: any = {
      status(code: number) {
        this._status = code;
        return this;
      },
      json(payload: any) {
        this._json = payload;
        return this;
      },
    };

    await messageController.sendMessage(req, res, () => {});

    expect(res._status).toBe(200);
    expect(res._json).toHaveProperty('data.jobId');
  });
});
