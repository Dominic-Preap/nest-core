import { Global, Module } from '@nestjs/common';

import { DynamoDBUserService } from './user/user.service';

@Global()
@Module({
  providers: [DynamoDBUserService],
  exports: [DynamoDBUserService]
})
export class DynamoDBModule {}
