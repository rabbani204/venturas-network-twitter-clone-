import { MailerModule } from '@m4yours/uni-nestmailer';
import { HandlebarsAdapter } from '@m4yours/uni-nestmailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MAIL_TRANSPORT } from './conig-transfort';
@Global() // 👈 global module
@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally

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
        template: {
          dir: path.join(__dirname, '../../..', 'templates/mail'),
          adapter: new HandlebarsAdapter(undefined, {
            inlineCssEnabled: true,
            inlineCssOptions: {
              url: ' ',
              preserveMediaQueries: true,
            },
          }),
          options: {
            strict: true,
          },
        },
        //mail preview
        // preview: {
        //   dir: path.join(__dirname, '../../..', 'templates/mail'),
        //   adapter: new HandlebarsAdapter(undefined, {
        //     inlineCssEnabled: true,
        //     inlineCssOptions: {
        //       url: ' ',
        //       preserveMediaQueries: true,
        //     },
        //   }),
        //   options: {
        //     strict: true,
        //   },
        // },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
