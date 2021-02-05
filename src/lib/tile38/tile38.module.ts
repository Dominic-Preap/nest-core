import { Global, Module } from '@nestjs/common';

import { Tile38Provider } from './tile38.provider';

@Global()
@Module({
  providers: [Tile38Provider],
  exports: [Tile38Provider]
})
export class Tile38Module {}
