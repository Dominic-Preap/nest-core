import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { compileFile } from 'pug';

import { InjectMailer, Mailer } from '@lib/mailer';

@Injectable()
export class MailerService {
  constructor(@InjectMailer() private readonly mailer: Mailer) {}

  async sendSampleEmail() {
    const data = [1, 2, 3, 4];
    const count = 5;

    const compiledFunction = compileFile(resolve('.', 'assets', 'templates', 'sample.pug'));
    this.mailer.send({
      from: '"Nest Boilerplate Project" <preapchanoudom@gmail.com>', // sender address
      to: 'someone@example.com', // list of receivers
      subject: 'Sample Email',
      html: compiledFunction({ count, data }),
      attachments: []
    });
  }
}
