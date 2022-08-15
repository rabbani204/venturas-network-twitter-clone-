import { MailerService } from '@m4yours/uni-nestmailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { AppLogger } from 'src/main-engine/logger/app-logger.service';
import { QueueMailDto } from './queue-mail.dto';

@Processor('lead-mail')
export class QueueMailConsumer {
  private readonly _logger = new Logger(QueueMailConsumer.name);
  constructor(
    private mailerService: MailerService,
    private readonly appLogger: AppLogger,
    private readonly configService: ConfigService,
  ) {}

  @OnQueueActive()
  public onActive(job: Job) {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  public onComplete(job: Job) {
    this._logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  public onError(job: Job<any>, error: any) {
    this._logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }
  @Process('message-job')
  readOperationJob(job: Job<QueueMailDto>) {
    // console.log(job.data);
    if (job.data.template) {
      this.mailerService
        .sendMail({
          to: job.data.senderMail,
          from: job.data.recipientMail ?? '"UniSearch" <info@myunisearch.com>', // override default from '"Support Team" <support@example.com>'
          subject: job.data.subject,
          template: `${job.data.template}`, //'./confirmation', // `.hbs` extension is appended automatically
          context: job.data.context, //context object
        })
        .then((res) => {
          this.appLogger.log('Mail Sent Successfully!');
          this.appLogger.log(`Mail Response : ${res.messageId}`);
          return res.messageId;
        })
        .catch((err) => {
          this.appLogger.log(err);
          return false;
        });
    } else {
      this.mailerService
        .sendMail({
          to: job.data.senderMail,
          from: job.data.recipientMail ?? '"UniSearch" <info@myunisearch.com>', // override default from '"Support Team" <support@example.com>'
          subject: job.data.subject,
          html: job.data.bodyHTML,
        })
        .then((res) => {
          this.appLogger.log('Mail Sent Successfully!');
          this.appLogger.log(`Mail Response : ${res.messageId}`);
          return res.messageId;
        })
        .catch((err) => {
          this.appLogger.log(err);
          return false;
        });
    }
  }
}
