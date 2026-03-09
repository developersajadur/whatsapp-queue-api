import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import logger from '../utils/logger';

export const setupSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    logger.log('Client connected', socket.id);
  });

  return io;
};
