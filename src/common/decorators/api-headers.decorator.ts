import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { Allow, IsOptional, validateOrReject } from 'class-validator';
import { Request } from 'express';
import * as moment from 'moment';

import { IsNotEmptyString, IsOptionalString } from './dto.decorator';

export const ApiCustomHeaders = createParamDecorator(
  async (args: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const header = new ApiCustomHeader(req);
    try {
      await validateOrReject(header);
      return header;
    } catch (err: any) {
      throw new BadRequestException(Object.values(err[0].constraints));
    }
  }
);

export class ApiCustomHeader {
  @IsNotEmptyString()
  readonly appVersion!: string;

  @IsOptionalString()
  readonly language!: string;

  @IsOptionalString()
  readonly latitude!: string;

  @IsOptionalString()
  readonly longitude!: string;

  @IsOptionalString()
  readonly platform!: string;

  @IsOptionalString()
  readonly osVersion!: string;

  @IsOptionalString()
  readonly udid!: string;

  @Allow()
  readonly ip!: string;

  @IsOptionalString()
  readonly timezone!: string;

  @IsOptional()
  @Type(() => Date)
  @Transform(x => moment(x.value))
  readonly timestamp!: moment.Moment;

  constructor(req: Request) {
    this.appVersion = req.get('x-app-version')!;
    this.ip = req.get('x-forwarded-for') || req.socket.remoteAddress || '127.0.0.1';
    this.language = ['en', 'km', 'zh'].find(x => x === req.get('x-language')) || 'en';
    this.latitude = req.get('x-latitude') || '';
    this.longitude = req.get('x-longitude') || '';
    this.platform = ['ios', 'android', 'web', 'api'].find(x => x === req.get('x-platform')) || '';
    this.osVersion = req.get('x-os-version') || '0.0.0';
    this.udid = req.get('x-udid') || '';
    this.timezone = req.get('x-timezone') || '';
    this.timestamp = moment(req.get('x-timestamp')).isValid()
      ? moment(req.headers['x-timestamp'])
      : moment();
  }
}
