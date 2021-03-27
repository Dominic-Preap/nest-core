import { Global, Module } from '@nestjs/common';
import { SequelizeModule as _SequelizeModule } from '@nestjs/sequelize';

import * as Models from '@models';

import { SequelizeConfigService } from './sequelize.service';

@Global()
@Module({
  imports: [
    _SequelizeModule.forRootAsync({ useClass: SequelizeConfigService }),
    _SequelizeModule.forFeature(Object.values(Models))
  ],
  exports: [_SequelizeModule]
})
export class SequelizeModule {}
