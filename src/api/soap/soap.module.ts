import { Global, Module } from '@nestjs/common';

import { HolidaySoapModule } from './holiday-soap/holiday-soap.module';

@Global()
@Module({
  imports: [HolidaySoapModule],
  exports: [HolidaySoapModule]
})
export class SoapModule {}
