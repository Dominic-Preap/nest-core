import { Global, HttpModule, Module } from '@nestjs/common';

import { WowzaProvider } from './wowza.provider';

@Global()
@Module({
  imports: [HttpModule.register({})],
  providers: [WowzaProvider],
  exports: [WowzaProvider]
})
export class WowzaModule {}
