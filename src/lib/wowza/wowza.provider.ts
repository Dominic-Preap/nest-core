import { HttpService } from '@nestjs/axios';

import { ConfigService } from '../config';
import { Wowza } from './wowza';
import { WOWZA_TOKEN } from './wowza.constant';

export const WowzaProvider = {
  inject: [ConfigService, HttpService],
  provide: WOWZA_TOKEN,
  useFactory: (configService: ConfigService, http: HttpService) => new Wowza(configService, http)
};
