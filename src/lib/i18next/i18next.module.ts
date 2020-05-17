import { Global, Module } from '@nestjs/common';

import { I18NextProvider } from './i18next.provider';

@Global()
@Module({
  providers: [I18NextProvider],
  exports: [I18NextProvider]
})
export class I18NextModule {}
