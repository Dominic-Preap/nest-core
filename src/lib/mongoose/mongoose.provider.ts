import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';

import { ConfigService } from '../config';
import { MONGOOSE_TOKEN } from './mongoose.constant';
import { MongooseConfig } from './mongoose.dto';

const logger = new Logger('MongooseModule');

export const mongooseProvider = {
  inject: [ConfigService],
  provide: MONGOOSE_TOKEN,
  useFactory: async (configService: ConfigService) => {
    const { MONGO_URI } = configService.validate('MongooseModule', MongooseConfig);
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    if (mongoose.connection.readyState === 1) {
      logger.log('Connection has been established successfully.');
    } else {
      logger.error('Unable to connect to the database:');
    }
  }
};
