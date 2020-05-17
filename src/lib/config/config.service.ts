import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { resolve } from 'path';

import { ConfigDto } from './config.dto';

export class ConfigService {
  readonly env: ConfigDto;
  private readonly envConfig: { [prop: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(resolve('.', filePath)));
    this.env = this.validate('ConfigModule', ConfigDto);
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  validate<T>(module: string, className: new () => T): T {
    const config = plainToClass(className as any, this.envConfig);
    const errors = validateSync(config as any, { whitelist: true, transform: true, forbidNonWhitelisted: false });
    if (errors.length > 0) {
      // const err = errors[0];
      // throw new Error(`${module}: env ${err.constraints[Object.keys(err.constraints)[0]]}`);

      errors.forEach(e => Logger.error(`${e.constraints[Object.keys(e.constraints)[0]]}`, undefined, module));
      throw new Error(`${module}: Invalid environment config.`);
    }
    return config as any;
  }
}
