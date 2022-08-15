import { MailerService } from '@m4yours/uni-nestmailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppLogger } from '../logger/app-logger.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly appLogger: AppLogger,
    private readonly configService: ConfigService, // private readonly userService: UserService,
  ) {
    this.appLogger.setContext('MailerService');
  }

  //send notes & replies email
  async sendNotesMail(
    userData: {
      email: any;
      userName: any;
      profileImage: any;
      userType: any;
      mailTo: string;
      hasProfileImage: boolean;
    },
    notesData: {
      subject: string;
      message: string;
      previewUrl: string;
      noteType: string;
    },
  ) {
    const data = await this.mailerService
      .sendMail({
        to: userData.mailTo,
        subject: `${userData.userName} - ${
          notesData.noteType === 'reply' ? 'Notes reply' : 'Posted a new note'
        }`,
        template: './notes',
        context: {
          subject: notesData.subject,
          message: notesData.message,
          previewUrl: notesData.previewUrl,
          hasProfileImage: userData.hasProfileImage,

          profileImage: userData.profileImage,
          userName: userData.userName,
          userType: userData.userType,
        },
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

    return data;
  }

  // send reply mail
  async sendingConversationReplyMail(replyMailData: {
    email: string;
    subject: string;
    message: string;
    universityName: string;
    isGuest: boolean;
    link: string;
  }) {
    const data = await this.mailerService
      .sendMail({
        to: replyMailData.email,
        subject: `${replyMailData.subject}`,
        template: './university-conversation-reply-to-students',
        context: {
          message: replyMailData.message,
          studentLink: replyMailData.link,
          universityName: replyMailData.universityName,
          isGuest: replyMailData.isGuest,
        },
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

    return data;
  }
}
