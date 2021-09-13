import { BadRequestException, Injectable } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import * as mime from 'mime-types';
import * as path from 'path';
import * as shell from 'shelljs';

import { C, T } from '@common';
import { GoogleCloudStorage, InjectGoogleCloudStorage } from '@lib/google-cloud-storage';

import { Size } from './upload.helper';

@Injectable()
export class UploadService {
  // private helper = new ImageResizeHelper(); // TODO:

  constructor(@InjectGoogleCloudStorage() private readonly storage: GoogleCloudStorage) {}

  async upload(file: Express.Multer.File, type: string) {
    if (!file) throw new BadRequestException('No file is selected.');

    // ! Insert into database
    const { filename: name, originalname: originalName, mimetype } = file;
    const extension = mime.extension(mimetype);
    // const contentType = mime.contentType(mimetype);
    // await File.create({ name, originalName, extension, size, contentType /* type */ });

    // ! Upload to cloud and remove file in temp folder
    const filePath = path.resolve(C.TEMP_PATH, name);
    await this.uploadToCloud(`temp/${name}`, filePath);
    shell.rm('-rf', filePath);

    return {
      name,
      originalName,
      extension,
      fileUrl: this.storage.config.getTempUrl(name)
    };
  }

  async moveFile(opt: { folderType: T.ImageType; fileName?: string; resize?: Size[] | boolean }) {
    const { fileName, folderType, resize } = opt;
    if (!fileName) return;
    const file = this.storage.bucket.file(`temp/${fileName}`);

    if (!resize) {
      const bucket = folderType;
      await file.move(`${bucket}/${fileName}`).then(([x]) => x.makePublic());
      return;
    }

    // Create temp directory if not exist yet
    const TEMP_PATH = path.resolve('.', 'public', 'temp-cloud');
    if (!existsSync(TEMP_PATH)) shell.mkdir('-p', TEMP_PATH);

    // TODO: will revisit later
    // Get temp url from google cloud storage
    // const gcloudTempUrl = this.storage.config.getTempUrl(fileName);

    // const req = request
    //   .get(gcloudTempUrl)
    //   .on('error', err => console.error('Cannot download photo', gcloudTempUrl))
    //   .on('response', resp => {
    //     if (resp.statusCode === 200) {
    //       // declare file name to download in temp directory
    //       const filePath = path.resolve(TEMP_PATH, fileName);
    //       req.pipe(createWriteStream(filePath)).on('close', async () => {
    //         // resize image base on type

    //         // if (resize) await resizeImage(`${TEMP_PATH}/${fileName}`, folderType);
    //         if (resize) await this.helper.resize(`${TEMP_PATH}/${fileName}`, folderType, resize);

    //         // upload all resize and original photos then remove from temp directory
    //         const regexPath = path.resolve(TEMP_PATH, `${fileName.split('.')[0]}*`); // ex: Test.jpg, Test_s.jpg, Test_l.jpg
    //         const allFiles = shell.ls(regexPath); // list all files by regex
    //         const bucket = folderType;
    //         await Promise.all(
    //           allFiles.map(f => this.uploadToCloud(`${bucket}/${path.basename(f)}`, f))
    //         ); // 5 files to be uploaded

    //         shell.rm('-rf', regexPath); // remove by regex from temp directory
    //         await file.delete(); // remove file in temp in google cloud
    //       });
    //     } else {
    //       console.log('download photo', resp.statusCode, resp.statusMessage);
    //     }
    //   });
  }

  private async uploadToCloud(fileName: string, filePath: string) {
    const file = this.storage.bucket.file(fileName);
    const contentType = mime.contentType(path.extname(filePath));
    return new Promise((resolve, reject) => {
      createReadStream(filePath)
        .pipe(
          file.createWriteStream({
            public: true,
            metadata: {
              contentType: typeof contentType === 'string' ? contentType : undefined,
              cacheControl: 'no-cache,max-age=0'
            }
          })
        )
        .on('error', e => {
          console.error('Upload Failed! ' + e.message, e.stack);
          resolve('Upload failed!'); // just ignore when upload fails
        })
        .on('finish', () => {
          console.log('Upload Success!', fileName);
          resolve(`${this.storage.config.GOOGLE_CLOUD_IMAGE_URL}/${fileName}`);
        });
    });
  }
}
