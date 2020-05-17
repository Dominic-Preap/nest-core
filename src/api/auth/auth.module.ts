import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Auth0Guard } from './auth0.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, Auth0Guard]
})
export class AuthModule {}
