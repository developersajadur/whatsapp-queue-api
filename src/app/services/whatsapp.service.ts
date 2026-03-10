import { Server } from 'socket.io';
import { Client, LocalAuth } from 'whatsapp-web.js';
import logger from '../utils/logger';
import qrcode from 'qrcode';

class WhatsAppService {
  private client!: Client;
  private io!: Server;

  initialize(io: Server) {
    this.io = io;

    this.client = new Client({
      authStrategy: new LocalAuth({
        clientId: 'whatsapp-client',
      }),
      puppeteer: {
        headless: false,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
        ],
      },
    });

    this.client.on('qr', async (qr) => {
      const qrImage = await qrcode.toDataURL(qr);
      this.io.emit('qr', qrImage);
      logger.info('QR generated');
    });

    this.client.on('ready', () => {
      logger.info('WhatsApp ready');
      this.io.emit('ready');
    });

    this.client.on('disconnected', (reason) => {
      logger.error('Disconnected: ' + reason);
      this.client.initialize();
    });

    this.client.initialize();
  }

  async sendMessage(phone: string, message: string) {
    if (!this.client || !this.client.info) {
      throw new Error('WhatsApp client not ready');
    }

    const formattedPhone = phone.replace(/\D/g, '');

    const numberId = await this.client.getNumberId(formattedPhone);

    if (!numberId) {
      throw new Error('Phone number not registered on WhatsApp');
    }

    return this.client.sendMessage(numberId._serialized, message);
  }
}

export const whatsappService = new WhatsAppService();
