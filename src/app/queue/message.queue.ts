import { Queue } from 'bullmq';
import { redisConnection } from '../redis/redisConnection';

export const MESSAGE_QUEUE_NAME = 'message-queue';

export const messageQueue = new Queue(MESSAGE_QUEUE_NAME, {
  connection: redisConnection,
});
