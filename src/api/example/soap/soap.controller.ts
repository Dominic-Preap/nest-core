import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HolidaySoapService } from '../../soap/holiday-soap/holiday-soap.service';

@ApiTags('Example - Soap')
@Controller('example/soap')
export class SoapController {
  constructor(private readonly soap: HolidaySoapService) {}

  @Get()
  getHolidayDate() {
    return this.soap.GetHolidayDate({
      countryCode: 'Canada',
      year: 2018,
      holidayCode: 'NEW-YEARS-DAY-ACTUAL'
    });
  }
}
