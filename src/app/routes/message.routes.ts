import { Router } from 'express';
import { messageController } from '../controllers/message.controller';
import validateRequest from '../middlewares/validateRequest';
import { sendMessageSchema } from '../validators/message.validator';
import { limiter } from '../middlewares/rateLimit.middleware';

const router = Router();

router.post(
  '/send',
  limiter,
  validateRequest(sendMessageSchema),
  messageController.sendMessage,
);

export const messageRoutes = router;
