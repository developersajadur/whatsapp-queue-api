import { messageQueue } from '../queue/message.queue';
import catchAsync from '../helpers/catchAsync';
import sendResponse from '../helpers/sendResponse';
import status from 'http-status';

export class MessageController {
  sendMessage = catchAsync(async (req, res) => {
    const job = await messageQueue.add('send-message', req.body, {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 3000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    });
    sendResponse(res, {
      success: true,
      message: 'Message queued successfully',
      statusCode: status.OK,
      data: {
        jobId: job.id,
      },
    });
  });
}
