import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

import { AUTH0_STRATEGY_NAME } from './auth0.constant';
import { AuthConfig } from './auth0.dto';

/**
 *
 *
 * @see https://dev.to/fullstack_to/use-auth0-to-secure-your-nestjs-application-mbo
 * @see https://stackoverflow.com/questions/53426069/getting-user-data-by-using-guards-roles-jwt
 */
@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, AUTH0_STRATEGY_NAME) {
  constructor(config: AuthConfig) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`,
        rateLimit: true
      }),
      algorithm: 'RS256',
      audience: config.AUTH0_AUDIENCE,
      issuer: `https://${config.AUTH0_DOMAIN}/`,
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
