import { createParamDecorator, ExecutionContext, Inject } from '@nestjs/common';

import { KEYCLOAK_TOKEN } from './keycloak.constant';

export const InjectKeycloakClient = () => Inject(KEYCLOAK_TOKEN);

export const KeycloakUser = createParamDecorator(
  (args: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user
);

export interface KeycloakPayload {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
}
