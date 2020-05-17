import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as _ from 'lodash';

import * as Entities from '@entities';
import { ConfigService } from '@lib/config';

import { TypeOrmConfig } from './typeorm.dto';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const config = this.configService.validate('TypeOrmModule', TypeOrmConfig);
    const { DB_CONNECTION, DB_HOST, DB_LOGGING, DB_PASSWORD, DB_PORT, DB_SCHEMA, DB_USERNAME } = config;
    return {
      type: DB_CONNECTION as any,
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_SCHEMA,
      logging: DB_LOGGING,
      entities: _.map(Entities, x => x),
      keepConnectionAlive: true // ! use this for when using webpack
      // synchronize: true DB_SYNC
      // connectString: For Oracle Connection "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=127.0.0.1)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=my_server)))"
    };
  }
}
