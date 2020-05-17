import { Global, Module } from '@nestjs/common';

import { mailerProvider } from './mailer.provider';

@Global()
@Module({
  providers: [mailerProvider],
  exports: [mailerProvider]
})
export class MailerModule {}
