import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry, Timeout } from '@nestjs/schedule';

// https://crontab.guru/
// https://cronjob.xyz/
// http://bradymholt.github.io/cRonstrue/#cronstrue-demo
// https://cronexpressiondescriptor.azurewebsites.net/?

@Injectable()
export class CronService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  @Timeout(5000)
  handleTimeout() {
    // ! Used when you want to start cron jobs or not
    this.schedulerRegistry.getCronJobs().forEach(job => job.stop());
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  handleCron() {
    console.log('loading every 5 minute.');
  }
}
