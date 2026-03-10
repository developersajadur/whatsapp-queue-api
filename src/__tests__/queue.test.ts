import { describe, it, expect } from 'vitest';
import { MESSAGE_QUEUE_NAME, messageQueue } from '../app/queue/message.queue';

describe('Queue', () => {
  it('should add message job', async () => {
    const job = await messageQueue.add('send-message', {
      phone: '880123',
      message: 'hello',
    });

    expect(job.id).toBeDefined();
  });

  it('queue name should be correct', () => {
    expect(MESSAGE_QUEUE_NAME).toBe('message-queue');
  });
});
