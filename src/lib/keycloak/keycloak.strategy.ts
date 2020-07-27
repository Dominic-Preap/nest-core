import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { KEYCLOAK_STRATEGY_NAME } from './keycloak.constant';
import { AuthConfig } from './keycloak.dto';

/**
 *
 *
 * @see https://dev.to/fullstack_to/use-auth0-to-secure-your-nestjs-application-mbo
 * @see https://stackoverflow.com/questions/53426069/getting-user-data-by-using-guards-roles-jwt
 */
@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, KEYCLOAK_STRATEGY_NAME) {
  constructor(config: AuthConfig) {
    const domainUri = `http://${config.KEYCLOAK_DOMAIN}/auth/realms/${config.KEYCLOAK_REALM}`;
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${domainUri}/protocol/openid-connect/certs`,
        rateLimit: true
      }),
      algorithm: 'RS256',
      audience: config.KEYCLOAK_AUDIENCE,
      issuer: domainUri,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  validate(payload: any, done: VerifiedCallback) {
    if (!payload) {
      done(new UnauthorizedException('Sorry, we were unable to process your request.'), false);
    }
    return done(null, payload);
  }
}
