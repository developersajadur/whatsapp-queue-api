import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import logger from '../utils/logger';

export const setupSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`);
  });
  io.on('disconnect', (socket) => {
    logger.info(`Client disconnected: ${socket.id}`);
  });

  return io;
};
