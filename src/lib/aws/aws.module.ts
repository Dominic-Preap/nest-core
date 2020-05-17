import { Global, Module } from '@nestjs/common';

import { AWSProvider } from './aws.provider';

@Global()
@Module({
  providers: [AWSProvider],
  exports: [AWSProvider]
})
export class AWSModule {}
