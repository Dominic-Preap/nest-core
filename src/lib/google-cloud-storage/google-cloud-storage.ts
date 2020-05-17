import { Bucket, Storage } from '@google-cloud/storage';
import { existsSync } from 'fs';
import { resolve } from 'path';

import { GoogleCloudStorageConfig } from './google-cloud-storage.dto';

export class GoogleCloudStorage {
  readonly bucket: Bucket;
  readonly storage: Storage;
  readonly config: GoogleCloudStorageConfig;

  constructor(config: GoogleCloudStorageConfig) {
    const keyFilename = resolve('.', config.GOOGLE_CLOUD_STORAGE_KEY_FILENAME_PATH);
    if (!existsSync(keyFilename)) throw new Error(`Unknown file ${keyFilename}`);

    this.config = config;
    this.storage = new Storage({ keyFilename });
    this.bucket = new Bucket(this.storage, config.GOOGLE_CLOUD_STORAGE_BUCKET_NAME);

    // OLD CODE
    // bucket.upload('https://example.com/images/image.png', function(err, file, res) {
    // handle upload...
    // });

    // NEW CODE
    // const request = require('request');
    // const file = bucket.file(name);
    // const writeStream = file.createWriteStream();
    // request(url).pipe(writeStream);
  }
}
