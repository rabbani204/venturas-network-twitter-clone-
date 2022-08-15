export class QueueMailDto {
  senderMail: string;
  recipientMail: string;
  url: string;
  template: string;
  subject: string;
  title: string;
  token: string;
  bodyHTML: string;
  bodyJson: any;
  others: any;
  context: any;
}
