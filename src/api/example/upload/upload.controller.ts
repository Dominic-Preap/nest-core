import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CSVMulterOption, ImageMulterOption } from '@common';

// import * as sharp from 'sharp';

@ApiTags('Example - Upload')
@Controller('example/upload')
export class UploadController {
  @Post('multi-upload')
  @UseInterceptors(FilesInterceptor('filename', 10, ImageMulterOption))
  @ApiOperation({ summary: 'Upload Photo' })
  @ApiConsumes('multipart/form-data')
  // @ApiImplicitFile({ name: 'filename', required: true, description: 'List of images' })
  multiUpload(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files.length) throw new BadRequestException('There are no file.');
    return { message: 'ok' };

    // TODO:
    // sharp.cache(false);
    // await sharp('input.jpg')
    //   .resize(200, 300)
    //   .jpeg()
    //   .toFile('output.jpg');
  }

  @Post('single-upload')
  @UseInterceptors(FileInterceptor('filename', CSVMulterOption))
  @ApiOperation({ summary: 'Upload Photo via CSV File' })
  @ApiConsumes('multipart/form-data')
  // @ApiImplicitFile({ name: 'filename', required: true, description: 'CSV file' })
  singleUpload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('There are no files.');
    return { message: 'ok' };
  }
}
