import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

import { AUTH0_STRATEGY_NAME } from '@lib/auth0';

@Injectable()
export class Auth0Guard extends PassportAuthGuard(AUTH0_STRATEGY_NAME) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const handler = context.getHandler();
    const roles = this.reflector.get<string[]>('roles', handler);
    const req = context.switchToHttp().getRequest<Request>();
    console.log('role', roles);

    if (roles === undefined) return true;

    await super.canActivate(context);
    console.log('req', (req as any).user);

    // NOTE: write custom service to check and validate user by auth0Id
    // const user = await this.service.validateUser(req.user.sub);
    // (req as any).authUser = user;

    return true;
  }

  /**
   * Checking request and handle custom 401 exception message
   *
   * @see https://stackoverflow.com/questions/55820591/nestjs-jwt-authentication-returns-401
   */
  handleRequest(err: Error, user: any, info: Error) {
    if (err || !user || info) {
      const msg = err
        ? err.message
        : info
        ? info.message
        : 'Sorry, we were unable to process your request.';
      throw new UnauthorizedException(msg);
    }
    return user;
  }
}
