import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ApiFileBody, CSVMulterOption, ImageMulterOption } from '@common';

import { UploadService } from './upload.service';

@Controller('v1/upload')
@ApiTags('Upload')
export class UploadController {
  constructor(private readonly service: UploadService) {}

  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiFileBody('filename')
  @ApiOperation({ summary: 'Upload Image' })
  @UseInterceptors(FileInterceptor('filename', ImageMulterOption))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.service.upload(file, 'image');
  }

  @Post('csv')
  @ApiConsumes('multipart/form-data')
  @ApiFileBody('filename')
  @ApiOperation({ summary: 'Upload CSV file' })
  @UseInterceptors(FileInterceptor('filename', CSVMulterOption))
  uploadCSV(@UploadedFile() file: Express.Multer.File) {
    return this.service.upload(file, 'csv');
  }
}
