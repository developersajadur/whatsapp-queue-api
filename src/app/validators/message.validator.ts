import { z } from 'zod';

export const sendMessageSchema = z.object({
  body: z.object({
    phone: z.string().min(10),
    message: z.string().min(1),
  }),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
