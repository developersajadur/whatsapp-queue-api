import { Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import validateRequest from '../middlewares/validateRequest';
import { sendMessageSchema } from '../validators/message.validator';

const router = Router();
const controller = new MessageController();

router.post(
  '/send',
  validateRequest(sendMessageSchema),
  controller.sendMessage,
);

export const messageRoutes = router;
