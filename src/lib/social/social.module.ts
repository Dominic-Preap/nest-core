import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { socialProvider } from './social.provider';

@Global()
@Module({
  imports: [HttpModule],
  providers: [socialProvider],
  exports: [socialProvider]
})
export class SocialModule {}
