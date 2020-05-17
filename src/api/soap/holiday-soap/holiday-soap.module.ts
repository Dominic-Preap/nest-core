import { Module } from '@nestjs/common';

import { HolidaySoapService } from './holiday-soap.service';

@Module({
  providers: [HolidaySoapService],
  exports: [HolidaySoapService]
})
export class HolidaySoapModule {}
