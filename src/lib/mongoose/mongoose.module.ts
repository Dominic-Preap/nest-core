import { Global, Module } from '@nestjs/common';

import { mongooseProvider } from './mongoose.provider';

@Global()
@Module({
  providers: [mongooseProvider],
  exports: [mongooseProvider]
})
export class MongooseModule {}
