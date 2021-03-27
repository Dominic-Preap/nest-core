import { Injectable } from '@nestjs/common';
import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize';

import { ConfigService } from '@lib/config';

import { SequelizeConfig } from './sequelize.dto';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const config = this.configService.validate('SequelizeModule--', SequelizeConfig);
    return {
      host: config.DB_HOST,
      port: config.DB_PORT,
      database: config.DB_SCHEMA,
      username: config.DB_USERNAME,
      password: config.DB_PASSWORD,
      dialect: config.DB_CONNECTION,
      logging: config.DB_LOGGING ? console.log : false,
      autoLoadModels: true,
      // synchronize: true,

      // Disable global timestamps: https://stackoverflow.com/questions/39587767/disable-updatedat-update-date-field-in-sequelize-js
      define: { timestamps: false },

      dialectOptions: {
        // ! For MSSQL
        // encrypt: false,
        // connectTimeout: 60000,
        // requestTimeout: 60000

        // ! For MySQL
        decimalNumbers: true // Convert string decimal  https://github.com/sequelize/sequelize/issues/8019,
      }
    };
  }
}
