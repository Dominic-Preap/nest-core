import { Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as moment from 'moment';

import { AuditingInterceptor, DayOffCalculation } from '@common';
// import { DynamoDBUserService } from '@dynamodb';

@ApiBearerAuth()
@ApiTags('Example - Others')
@Controller('example/other')
export class OtherController {
  // constructor(private readonly user: DynamoDBUserService) {}
  @Get('testing')
  @ApiOperation({})
  async testingDynamoDb() {
    // await this.user.create({
    //   firstName: 'andy',
    //   lastName: 'kheng',
    //   email: 'andy.kheng@pathmazing.com',
    //   status: 'active',
    //   address: [{ lat: '0.44', lng: '0.55' }],
    //   profile: { nickName: 'EGXXX', logo: 'zzz.jpg' },
    //   tags: ['good', 'boy']
    // });
    // return this.user.findAll({ status: 'active' });
  }

  @Post()
  @UseInterceptors(AuditingInterceptor)
  @ApiOperation({ summary: 'Capture Request Log into DB' })
  async captureRequestLog() {
    return 'will capture this request log';
  }

  @Get()
  @ApiOperation({ summary: 'Calculate day off' })
  async calculateDayOff() {
    const dayOff = new DayOffCalculation();

    dayOff.setSchedule({
      mon: [
        { breaks: [{ start: '12:00', end: '13:00' }], works: [{ start: '8:00', end: '17:00' }] }
      ],
      tue: [
        { breaks: [{ start: '12:00', end: '13:00' }], works: [{ start: '8:00', end: '17:00' }] }
      ],
      wed: [
        { breaks: [{ start: '12:00', end: '13:00' }], works: [{ start: '8:00', end: '17:00' }] }
      ],
      thu: [
        { breaks: [{ start: '12:00', end: '13:00' }], works: [{ start: '8:00', end: '17:00' }] }
      ],
      fri: [
        { breaks: [{ start: '12:00', end: '13:00' }], works: [{ start: '8:00', end: '17:00' }] }
      ],
      sat: [],
      sun: []
    });

    dayOff.setHolidays([moment().hours(0).add(1, 'day').toDate()]);

    dayOff.setDayOffs(
      moment().startOf('day').hour(12).minute(0).toDate(),
      moment().startOf('day').hour(12).minute(0).add(4, 'day').toDate(),
      'asia/phnom_penh'
    );
    return dayOff.calculate();
  }
}
