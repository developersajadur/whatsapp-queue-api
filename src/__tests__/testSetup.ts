/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
// Shared test setup: common mocks used across tests
import { vi } from 'vitest';

// Mock bullmq to avoid creating real Redis connections
vi.mock('bullmq', () => {
  return {
    Queue: class {
      constructor(name: string, opts: any) {}
      async add(name: string, data: any, options: any) {
        return { id: 'job-mock' };
      }
    },
    Worker: class {},
  };
});

// Stub rate limiter middleware so tests aren't blocked
vi.mock('../app/middlewares/rateLimit.middleware', () => {
  return {
    limiter: (req: any, res: any, next: any) => next(),
  };
});

export {};
