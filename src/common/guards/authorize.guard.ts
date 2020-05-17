import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
// import * as crypto from 'crypto';
// import { Request } from 'express';

/**
 * The act of verifying the access rights of a user to interact with a resource.
 * @description https://medium.freecodecamp.org/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52
 */
export const Authorize = () => UseGuards(AuthorizeGuard);

@Injectable()
class AuthorizeGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    // TODO: checked if database is SQL or NoSQL

    // const req = context.switchToHttp().getRequest<Request>();

    // const authorization = req.get('authorization') || '';
    // const { clientId } = req.body;

    // Find Client App from database to make sure it exist
    // const clientApp = await ClientApp.findOne({ clientId });
    // if (!clientApp) throw new UnauthorizedException('Client application was not found');

    // encrypted Client ID and Client Secret and compare with token from header
    // const hash = clientApp.clientId + ':' + clientApp.clientSecret;
    // const sha1Token = crypto
    //   .createHash('sha1')
    //   .update(hash)
    //   .digest('hex');

    // const [scheme, token] = authorization.split(' ');
    // if (scheme.toLowerCase() !== 'bearer') throw new UnauthorizedException('Invalid Authorization Scheme');
    // if (token !== sha1Token) throw new UnauthorizedException('Invalid Authorization Token');

    return true;
  }
}
