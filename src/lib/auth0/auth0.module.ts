import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { Auth0ClientProvider, Auth0StrategyProvider } from './auth0.provider';

@Global()
@Module({
  imports: [PassportModule],
  providers: [Auth0ClientProvider, Auth0StrategyProvider],
  exports: [Auth0ClientProvider, Auth0StrategyProvider]
})
export class Auth0Module {}
