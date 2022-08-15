import { Module } from '@nestjs/common';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@m4yours/uni-nestmailer';
import { HandlebarsAdapter } from '@m4yours/uni-nestmailer/dist/adapters/handlebars.adapter';
import { MAIL_TRANSPORT } from 'src/main-engine/mail/conig-transfort';
import { QueueMailService } from './queue-mail.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport:
          config.get('MAIL_TRANSPORT') === 'local'
            ? MAIL_TRANSPORT.MAIL_TRANSPORT_LOCAL
            : config.get('MAIL_TRANSPORT') === 'dev'
            ? MAIL_TRANSPORT.MAIL_TRANSPORT_DEV
            : {
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                  type: 'OAuth2',
                  user: config.get('MAIL_USER'),
                  clientId: config.get('MAIL_CLIENT_ID'),
                  clientSecret: config.get('MAIL_CLIENT_SECRET'),
                  refreshToken: config.get('MAIL_REFRESH_TOKEN'),
                  accessToken: config.get('MAIL_ACCESS_TOKEN'),
                },
              },
        defaults: {
          from: `"UniSearch" <${config.get('MAIL_FROM')}>`,
        },
        preview: false,

        template: {
          dir: path.join(__dirname, '../../..', 'templates/mail'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),

    BullModule.registerQueueAsync({
      name: 'lead-mail', // mail queue name
    }),
  ],
  providers: [QueueMailService],
  exports: [QueueMailService],
})
export class QueueMailModule {}
