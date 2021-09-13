import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface JWTDecoded {
  timestamp: number;
  clientId: string;
  uid: string;
}

/**
 * The verification of the credentials of the connection attempt. Or the act of logging a user in.
 * @description https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
 */
export const Authenticate = () => UseGuards(AuthenticateGuard);

@Injectable()
class AuthenticateGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const authorization = req.get('token') || '';

    const [scheme, token] = authorization.split(' ');
    if (scheme.toLowerCase() !== 'bearer')
      throw new UnauthorizedException('Invalid Authorization Scheme');
    if (!token) throw new UnauthorizedException('Invalid Authorization Token');

    try {
      // Decoded token from header
      const { clientId } = await this.jwt.verifyAsync<JWTDecoded>(token);
      console.log(clientId);

      // TODO: checked if database is SQL or NoSQL
      // Find Client App from database to make sure it exist
      // const clientApp = await ClientApp.findOne({ where: { clientId } });
      // if (!clientApp) throw new UnauthorizedException('Client application was not found');

      return true;
    } catch (e: any) {
      throw new UnauthorizedException(e.name + ' ' + e.message);
    }
  }
}
