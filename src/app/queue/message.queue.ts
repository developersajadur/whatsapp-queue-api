import { Queue } from 'bullmq';
import { redisConnection } from '../redis/redisConnection';

export const messageQueue = new Queue('message-queue', {
  connection: redisConnection,
});
