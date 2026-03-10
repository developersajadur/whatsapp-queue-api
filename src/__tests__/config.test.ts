import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

const envBackup = { ...process.env };

describe('Config', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env = { ...envBackup };
  });

  it('config loads environment variables and default port fallback works', async () => {
    process.env.NODE_ENV = 'test';
    process.env.PORT = '5000';
    process.env.REDIS_HOST = 'localhost';
    process.env.REDIS_PORT = '6379';
    process.env.RATE_LIMIT_WINDOW_MS = '60000';
    process.env.RATE_LIMIT_MAX_REQUESTS = '50';

    const config = await import('../app/config');

    expect(config.default.node_env).toBe('test');
    expect(config.default.port).toBe('5000');
    expect(config.default.redis.host).toBe('localhost');
    expect(config.default.redis.port).toBe(6379);
    expect(config.default.rateLimit.windowMs).toBe(60000);
    expect(config.default.rateLimit.max).toBe(50);
  });
});
