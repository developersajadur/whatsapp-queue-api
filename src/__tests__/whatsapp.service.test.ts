import { describe, it, expect } from 'vitest';

describe('WhatsApp Service', () => {
  it('should format phone number', () => {
    const phone = '+8801521777164';

    const chatId = phone.replace(/\D/g, '') + '@c.us';

    expect(chatId).toBe('8801521777164@c.us');
  });
});
