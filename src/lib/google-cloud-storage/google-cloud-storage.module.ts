import { Global, Module } from '@nestjs/common';

import { GoogleCloudStorageProvider } from './google-cloud-storage.provider';

@Global()
@Module({
  providers: [GoogleCloudStorageProvider],
  exports: [GoogleCloudStorageProvider]
})
export class GoogleCloudStorageModule {}
