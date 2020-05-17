import { Allow, IsNotEmpty, IsString } from 'class-validator';

import { T } from '@common';

export class GoogleCloudStorageConfig {
  @IsNotEmpty()
  @IsString()
  GOOGLE_CLOUD_STORAGE_KEY_FILENAME_PATH!: string;

  @IsNotEmpty()
  @IsString()
  GOOGLE_CLOUD_STORAGE_BUCKET_NAME!: string;

  @Allow()
  private SIZE = new Map([
    // -------
    ['df', '.'],
    ['lg', '_l.'],
    ['md', '_m.'],
    ['sm', '_s.'],
    ['xs', '_t.']
  ]);

  get GOOGLE_CLOUD_BASE_URL() {
    return `https://storage.googleapis.com/${this.GOOGLE_CLOUD_STORAGE_BUCKET_NAME}`;
  }

  get GOOGLE_CLOUD_IMAGE_URL() {
    return `https://storage.googleapis.com/${this.GOOGLE_CLOUD_STORAGE_BUCKET_NAME}/image/`;
  }

  getTempUrl(fileName: string) {
    return `${this.GOOGLE_CLOUD_BASE_URL}/temp/${fileName}?ignoreCache=1`;
  }

  getCloudUrl(image: T.ImageType, fileName: string, size?: T.ImageSize) {
    if (!fileName) return '';

    const s = this.SIZE.get(size || 'df')!;
    const file = fileName.replace('.', s);
    return `${this.GOOGLE_CLOUD_BASE_URL}/${image}/${file}`;
  }
}
