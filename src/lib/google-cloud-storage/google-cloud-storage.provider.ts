import { ConfigService } from '../config';
import { GoogleCloudStorage } from './google-cloud-storage';
import { GOOGLE_CLOUD_STORAGE_TOKEN } from './google-cloud-storage.constant';
import { GoogleCloudStorageConfig } from './google-cloud-storage.dto';

export const GoogleCloudStorageProvider = {
  inject: [ConfigService],
  provide: GOOGLE_CLOUD_STORAGE_TOKEN,
  useFactory: (configService: ConfigService) => {
    const config = configService.validate('GoogleCloudStorageModule', GoogleCloudStorageConfig);
    return new GoogleCloudStorage(config);
  }
};
