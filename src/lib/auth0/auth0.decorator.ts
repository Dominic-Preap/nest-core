import { createParamDecorator, ExecutionContext, Inject } from '@nestjs/common';

import { AUTH0_TOKEN } from './auth0.constant';

export const InjectAuth0ManagementClient = () => Inject(AUTH0_TOKEN);

export const Auth0User = createParamDecorator(
  (args: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user
);

export interface Auth0Payload {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
}
