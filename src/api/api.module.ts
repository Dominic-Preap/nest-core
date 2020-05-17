import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CronModule } from './cron/cron.module';
import { SharedModule } from './shared/shared.module';

// import { UploadModule } from './upload/upload.module';
// import { ExampleModule } from './example/example.module';
// import { SoapModule } from './soap/soap.module';

@Module({
  imports: [
    // --
    AuthModule,
    CronModule,
    // ExampleModule,
    SharedModule
    // SoapModule
    // UploadModule
  ]
})
export class ApiModule {}
