import { Router } from 'express';
import { messageRoutes } from './message.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/messages',
    route: messageRoutes,
  },
];

moduleRoutes.forEach((item) => router.use(item.path, item.route));

export default router;
