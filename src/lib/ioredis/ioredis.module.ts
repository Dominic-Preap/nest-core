import { Global, Module } from '@nestjs/common';

import { IORedisProvider, IORedisPubSubProvider } from './ioredis.provider';

@Global()
@Module({
  providers: [IORedisProvider, IORedisPubSubProvider],
  exports: [IORedisProvider, IORedisPubSubProvider]
})
export class IORedisModule {}
