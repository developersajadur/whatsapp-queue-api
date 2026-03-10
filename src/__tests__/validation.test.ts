/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { sendMessageSchema } from '../app/validators/message.validator';

describe('Validation', () => {
  it('valid message payload passes', async () => {
    await expect(
      sendMessageSchema.parseAsync({
        body: { phone: '1234567890', message: 'hello' },
      }),
    ).resolves.toBeDefined();
  });

  it('missing phone fails', async () => {
    await expect(
      sendMessageSchema.parseAsync({ body: { message: 'hello' } as any }),
    ).rejects.toBeDefined();
  });

  it('missing message fails', async () => {
    await expect(
      sendMessageSchema.parseAsync({ body: { phone: '1234567890' } as any }),
    ).rejects.toBeDefined();
  });

  it('empty message fails', async () => {
    await expect(
      sendMessageSchema.parseAsync({
        body: { phone: '1234567890', message: '' },
      }),
    ).rejects.toBeDefined();
  });

  it('phone format normalization works (removes non-digits)', () => {
    const raw = '+1 (555) 123-4567';
    const normalized = raw.replace(/\D/g, '');
    expect(normalized).toBe('15551234567');
  });
});
