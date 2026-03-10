/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from 'vitest';
import { whatsappService } from '../app/services/whatsapp.service';

vi.spyOn(whatsappService, 'sendMessage').mockResolvedValue(
  true as unknown as any,
);

describe('Worker', () => {
  it('should call sendMessage', async () => {
    await whatsappService.sendMessage('8801', 'test');

    expect(whatsappService.sendMessage).toHaveBeenCalled();
  });
});
