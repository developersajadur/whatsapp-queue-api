import IORedis from 'ioredis';
import config from '../config';
import { ConnectionOptions } from 'bullmq';

export const redisConnection = new IORedis({
  host: config.redis.host,
  port: config.redis.port,

  maxRetriesPerRequest: null,

  reconnectOnError: () => true,

  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  },
}) as ConnectionOptions;
