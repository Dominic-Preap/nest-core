import { Global, Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

import { ConfigService } from '@lib/config';

@Global()
@Module({
  exports: [NestJwtModule],
  imports: [
    NestJwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({ secret: configService.env.JWT_SECRET })
    })
  ]
})
export class JwtModule {}
