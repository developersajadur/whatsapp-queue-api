import { Worker } from 'bullmq';
import logger from '../utils/logger';
import { redisConnection } from '../redis/redisConnection';
import { whatsappService } from '../services/whatsapp.service';

export const messageWorker = new Worker(
  'message-queue',
  async (job) => {
    const { phone, message } = job.data;

    logger.info(`Sending message to ${phone}`);

    await whatsappService.sendMessage(phone, message);
  },
  {
    connection: redisConnection,
    concurrency: 3,
  },
);

/*
  Worker Events
*/

messageWorker.on('completed', (job) => {
  logger.info(`Job completed: ${job.id}`);
});

messageWorker.on('failed', (job, err) => {
  console.log(err);
  logger.error(`Job failed: ${job?.id} - ${err.message}`);
});

messageWorker.on('error', (err) => {
  logger.error(`Worker error: ${err.message}`);
});
