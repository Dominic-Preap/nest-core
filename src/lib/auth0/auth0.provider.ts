import { Provider } from '@nestjs/common';
import { ManagementClient } from 'auth0';

import { ConfigService } from '../config';
import { AUTH0_TOKEN } from './auth0.constant';
import { AuthConfig } from './auth0.dto';
import { Auth0Strategy } from './auth0.strategy';

export const Auth0ClientProvider: Provider = {
  inject: [ConfigService],
  provide: AUTH0_TOKEN,
  useFactory: async (configService: ConfigService) => {
    const config = configService.validate('Auth0Client', AuthConfig);
    return new ManagementClient({
      domain: config.AUTH0_DOMAIN,
      clientId: config.AUTH0_CLIENT_ID,
      clientSecret: config.AUTH0_CLIENT_SECRET
    });
  }
};

export const Auth0StrategyProvider: Provider = {
  inject: [ConfigService],
  provide: Auth0Strategy,
  useFactory: async (configService: ConfigService) => {
    const config = configService.validate('Auth0Module', AuthConfig);
    return new Auth0Strategy(config);
  }
};
