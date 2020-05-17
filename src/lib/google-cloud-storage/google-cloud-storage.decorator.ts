import { Inject } from '@nestjs/common';

import { GOOGLE_CLOUD_STORAGE_TOKEN } from './google-cloud-storage.constant';

export const InjectGoogleCloudStorage = () => Inject(GOOGLE_CLOUD_STORAGE_TOKEN);
