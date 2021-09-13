import { Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { MailerConfig } from './mailer.dto';

// import { Mandrill } from 'mandrill-api';
export class Mailer {
  // private mandrillClient: Mandrill;
  private transporter!: nodemailer.Transporter;
  private logger: Logger = new Logger('MailerModule');

  constructor(private readonly config: MailerConfig) {
    switch (config.MAILER_TYPE) {
      case 'mandrill':
        this.mandrillConfig(config.MAILER_MANDRILL_API_KEY);
        break;

      case 'gmail':
        this.gmailConfig(config.MAILER_GMAIL_USERNAME, config.MAILER_GMAIL_PASSWORD);
        break;

      case 'ethereal':
        this.etherealConfig(config.MAILER_ETHEREAL_USERNAME, config.MAILER_ETHEREAL_PASSWORD);
        break;

      default:
        break;
    }
  }

  async send(opts: SendOptions): Promise<void> {
    try {
      if (this.config.MAILER_TYPE === 'mandrill') {
        // const message = {
        //   auto_text: true,
        //   from_email: opts.fromEmail,
        //   from_name: opts.fromName,
        //   html: opts.html,
        //   important: true,
        //   subject: opts.subject,
        //   to: opts.to.map(email => ({ email, type: 'to' }))
        // };
        // this.mandrillClient.messages.send(
        //   { message, async: true },
        //   result => {
        //     this.logger.log(`Mail sent to ${opts.to}`);
        //   },
        //   (error: any) => {
        //     this.logger.error(error.message, error.stack);
        //   }
        // );
      } else {
        await this.transporter.sendMail(opts);
        this.logger.log(`Mail sent to ${opts.to}`);
      }
    } catch (err: any) {
      this.logger.error(err.message, err.stack);
    }
  }

  private etherealConfig(user: string, pass: string) {
    this.logger.log('Using "ethereal"');
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: { user, pass }
    });
  }

  private gmailConfig(user: string, pass: string) {
    this.logger.log('Using "gmail"');
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: { user, pass }
    });
  }

  private mandrillConfig(apiKey: string) {
    this.logger.log('Using "mandrill"');
    // this.mandrillClient = new Mandrill(apiKey);
    // this.mandrillClient.users.ping(
    //   {},
    //   result => this.logger.log('ping "mandrill" success'),
    //   e => this.logger.error('ping "mandrill" failed')
    // );
  }
}

export interface SendOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
  attachments?: { path: string; filename: string }[];
}
