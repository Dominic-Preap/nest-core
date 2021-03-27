import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import * as Entities from '@entities';
import { ConfigService } from '@lib/config';

import { TypeOrmConfig } from './typeorm.dto';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const config = this.configService.validate('TypeOrmModule', TypeOrmConfig);
    return {
      type: config.DB_CONNECTION as any,
      host: config.DB_HOST,
      port: config.DB_PORT,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      database: config.DB_SCHEMA,
      logging: config.DB_LOGGING,
      entities: Object.values(Entities),
      keepConnectionAlive: true // ! use this for when using webpack
      // synchronize: true DB_SYNC
      // connectString: For Oracle Connection "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=127.0.0.1)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=my_server)))"
    };
  }
}
