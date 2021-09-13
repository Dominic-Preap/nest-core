import { HttpService } from '@nestjs/axios';

import { ConfigService } from '../config';
import { SendBird } from './sendbird';
import { SENDBIRD_TOKEN } from './sendbird.constant';

export const SendBirdProvider = {
  inject: [ConfigService, HttpService],
  provide: SENDBIRD_TOKEN,
  useFactory: (configService: ConfigService, http: HttpService) => new SendBird(configService, http)
};
