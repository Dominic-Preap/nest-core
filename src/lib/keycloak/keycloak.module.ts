import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { KeycloakClientProvider, KeycloakStrategyProvider } from './keycloak.provider';

@Global()
@Module({
  imports: [PassportModule],
  providers: [KeycloakClientProvider, KeycloakStrategyProvider],
  exports: [KeycloakClientProvider, KeycloakStrategyProvider]
})
export class KeycloakModule {}
