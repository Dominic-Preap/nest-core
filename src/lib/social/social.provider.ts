import { HttpService } from '@nestjs/axios';

import { ConfigService } from '../config';
import { Social } from './social';
import { SOCIAL_TOKEN } from './social.constant';
import { SocialConfig } from './social.dto';

export const socialProvider = {
  inject: [ConfigService, HttpService],
  provide: SOCIAL_TOKEN,
  useFactory: (configService: ConfigService, http: HttpService) => {
    const config = configService.validate('SocialModule', SocialConfig);
    return new Social(config, http);
  }
};
