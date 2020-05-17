import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { Allow, IsOptional } from 'class-validator';
import { Request } from 'express';
import * as moment from 'moment';

import { IsOptionalString } from './dto.decorator';

type Platform = 'ios' | 'android' | 'web' | 'api';
type LanguageType = 'en' | 'km' | 'zh' | 'ko';

export const ApiCustomHeaders = createParamDecorator((args: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>();

  const xLanguage = req.get('x-language') || '';
  const language = ['en', 'km', 'zh', 'ko'].includes(xLanguage) ? xLanguage : 'en';

  return new ApiCustomHeader(
    req.get('authorization'),
    req.get('x-app-version'),
    req.get('x-forwarded-for') || req.connection.remoteAddress || '127.0.0.1',
    language as LanguageType,
    req.get('x-latitude'),
    req.get('x-longitude'),
    req.get('x-platform') as Platform,
    req.get('x-os-version'),
    req.get('x-udid'),
    req.get('x-timezone'),
    moment(req.get('x-timestamp')).isValid() ? moment(req.headers['x-timestamp']) : moment()
  );
});

export class ApiCustomHeader {
  @IsOptionalString()
  readonly authorization: string = '';

  @IsOptionalString()
  readonly appVersion: string = '0.0.0';

  @IsOptionalString()
  readonly language: LanguageType = 'en';

  @IsOptionalString()
  readonly latitude: string = '0';

  @IsOptionalString()
  readonly longitude: string = '0';

  @IsOptionalString()
  readonly platform: Platform = 'web';

  @IsOptionalString()
  readonly osVersion: string = '0.0.0';

  @IsOptionalString()
  readonly udid: string = '';

  @Allow()
  readonly ip: string = '127.0.0.1';

  @IsOptionalString()
  readonly timezone: string = 'Asia/Phnom_Penh';

  @IsOptional()
  @Type(() => Date)
  @Transform(value => moment(value))
  readonly timestamp: moment.Moment = moment();

  constructor(
    authorization = '',
    appVersion = '0.0.0',
    ip: string,
    language: LanguageType = 'en',
    latitude = '0',
    longitude = '0',
    platform: Platform = 'web',
    osVersion = '0.0.0',
    udid = '',
    timezone = 'Asia/Phnom_Penh',
    timestamp: moment.Moment = moment()
  ) {
    this.ip = ip;
    this.authorization = authorization;
    this.appVersion = appVersion;
    this.language = ['en', 'km', 'zh', 'ko'].includes(language) ? language : 'en';
    this.latitude = latitude;
    this.longitude = longitude;
    this.platform = ['web', 'ios', 'android', 'api'].includes(platform) ? platform : 'web';
    this.osVersion = osVersion;
    this.udid = udid;
    this.timezone = timezone;
    this.timestamp = timestamp;
  }
}
