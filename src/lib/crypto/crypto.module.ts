import { Global, Module } from '@nestjs/common';

import { CryptoProvider } from './crypto.provider';

@Global()
@Module({
  providers: [CryptoProvider],
  exports: [CryptoProvider]
})
export class CryptoModule {}
