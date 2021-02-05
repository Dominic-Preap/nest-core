import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

import * as Models from '@models';

import { ConfigService } from '../config';
import { SEQUELIZE_TOKEN } from './sequelize.constant';
import { SequelizeConfig } from './sequelize.dto';

export const databaseProvider = {
  inject: [ConfigService],
  provide: SEQUELIZE_TOKEN,
  useFactory: async (configService: ConfigService) => {
    const {
      DB_CONNECTION,
      DB_HOST,
      DB_LOGGING,
      DB_PASSWORD,
      DB_PORT,
      DB_SCHEMA,
      DB_USERNAME,
      DB_SYNC
    } = configService.validate('SequelizeModule', SequelizeConfig);

    const sequelize = new Sequelize({
      host: DB_HOST,
      port: DB_PORT,
      database: DB_SCHEMA,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      dialect: DB_CONNECTION,
      logging: DB_LOGGING ? console.log : false,

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
    });

    sequelize
      .authenticate()
      .then(() => Logger.log('Connection has been established successfully.'))
      .catch(err => Logger.error('Unable to connect to the database:', err.message));

    // ! Customize models by inject config class into that models
    sequelize.addModels(Object.values(Models));
    // sequelize.addModels(_.map(Models, x => x));

    if (DB_SYNC) await sequelize.sync();

    return sequelize;
  }
};
