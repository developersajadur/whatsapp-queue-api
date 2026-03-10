import { createServer, Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import app from './app';
import config from './app/config';
import { whatsappService } from './app/services/whatsapp.service';
import logger from './app/utils/logger';
import './app/queue/message.worker';
import { setupSocket } from './app/sockets/socket';

const port = config.port;

let server: HttpServer;

async function main() {
  // create HTTP server
  server = createServer(app);

  // socket init
  const io = setupSocket(server);

  // initialize WhatsApp client
  whatsappService.initialize(io);

  // start server
  server.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
}

main().catch((err) => {
  logger.error('Error starting server:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection detected. Shutting down...', err);

  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception detected. Shutting down...', err);
  process.exit(1);
});
