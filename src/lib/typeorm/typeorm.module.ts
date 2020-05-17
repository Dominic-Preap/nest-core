import { Global, Module } from '@nestjs/common';
import { TypeOrmModule as OrmModule } from '@nestjs/typeorm';
import * as _ from 'lodash';

import * as Entities from '@entities';
import * as Repositories from '@repositories';

import { TypeOrmConfigService } from './typeorm.service';

@Global()
@Module({
  imports: [
    OrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    OrmModule.forFeature([..._.map(Entities, x => x), ..._.map(Repositories, x => x)])
  ],
  exports: [OrmModule]
})
export class TypeOrmModule {}
