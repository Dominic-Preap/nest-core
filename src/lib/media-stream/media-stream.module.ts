import { Global, Module } from '@nestjs/common';

import { mediaStreamProvider } from './media-stream.provider';

@Global()
@Module({
  providers: [mediaStreamProvider],
  exports: [mediaStreamProvider]
})
export class MediaStreamModule {}
