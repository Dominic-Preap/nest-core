import { Module } from '@nestjs/common';

import { CronResolver } from './cron.resolver';
import { CronService } from './cron.service';

@Module({
  providers: [CronService, CronResolver]
})
export class CronModule {}
