import { Global, Module } from '@nestjs/common';

import { databaseProvider } from './sequelize.provider';

@Global()
@Module({
  providers: [databaseProvider],
  exports: [databaseProvider]
})
export class SequelizeModule {}
