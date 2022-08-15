import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { QueueMailDto } from './queue-mail.dto';

@Injectable()
export class QueueMailService {
  constructor(@InjectQueue('lead-mail') private queue: Queue) {}

  async sendMail(data: QueueMailDto) {
    await this.queue.add('message-job', data, { delay: 2000 });
  }
}
