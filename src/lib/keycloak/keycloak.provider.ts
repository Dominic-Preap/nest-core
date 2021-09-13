import Keycloak from '@keycloak/keycloak-admin-client';
import { Provider } from '@nestjs/common';
import { Issuer } from 'openid-client';

import { ConfigService } from '../config';
import { KEYCLOAK_TOKEN } from './keycloak.constant';
import { AuthConfig } from './keycloak.dto';
import { KeycloakStrategy } from './keycloak.strategy';

export const KeycloakStrategyProvider: Provider = {
  inject: [ConfigService],
  provide: KeycloakStrategy,
  useFactory: async (configService: ConfigService) => {
    const config = configService.validate('KeycloakModule', AuthConfig);
    return new KeycloakStrategy(config);
  }
};

export const KeycloakClientProvider: Provider = {
  inject: [ConfigService],
  provide: KEYCLOAK_TOKEN,
  useFactory: async (configService: ConfigService) => {
    const config = configService.validate('KeycloakClient', AuthConfig);

    const baseUrl = `http://${config.KEYCLOAK_DOMAIN}/auth`;
    const kc = new Keycloak({ baseUrl, realmName: config.KEYCLOAK_REALM });
    // Authorize with username / password
    // await kc.auth({
    //   username: config.KEYCLOAK_USERNAME,
    //   password: config.KEYCLOAK_PASSWORD,
    //   grantType: 'password',
    //   clientId: 'admin-cli'
    // });

    const keycloakIssuer = await Issuer.discover(`${baseUrl}/realms/${config.KEYCLOAK_REALM}`);
    const client = new keycloakIssuer.Client({ client_id: 'admin-cli', client_secret: '123' });
    const tokenSet = await client.grant({
      grant_type: 'password',
      username: config.KEYCLOAK_USERNAME,
      password: config.KEYCLOAK_PASSWORD
    });

    kc.setAccessToken(tokenSet.access_token!);
    setInterval(async () => {
      const ts = await client.refresh(tokenSet.refresh_token!);
      kc.setAccessToken(ts.access_token!);
    }, 58 * 1000); // 58 seconds

    return kc;
  }
};
