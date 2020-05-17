import { Global, Module } from '@nestjs/common';

// import { FirebaseAdminService } from './firebase-admin.service';
// import { MailerService } from './mailer.service';

@Global()
@Module({
  providers: [
    /* FirebaseAdminService, MailerService*/
  ],
  exports: [
    /* FirebaseAdminService, MailerService */
  ]
})
export class SharedModule {}
