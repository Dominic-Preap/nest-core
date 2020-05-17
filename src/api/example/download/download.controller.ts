import { Controller, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as archiver from 'archiver';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@ApiBearerAuth()
@ApiTags('Example - Download')
@Controller('example/download')
export class DownloadController {
  @Post()
  @ApiOperation({ summary: 'Download Image' })
  async download(@Res() res: Response) {
    // CREATE ZIP AND ADD PHOTOS INTO
    // ==============================
    const images = ['dark-souls.jpg', 'bloodborne.jpg', 'sekiro.jpg'];
    const zip = archiver('zip');
    for (const img of images) {
      const photoPath = path.resolve('.', 'assets', 'images', img);
      if (fs.existsSync(photoPath)) zip.file(photoPath, { name: img });
    }

    // CREATE FILE STREAM THAN PIPE AND CALL FINALIZE
    // ==============================================
    res.attachment('download.zip'); // set the archive name
    zip.on('error', err => res.status(500).send({ error: err.message }));
    zip.pipe(res); // this is the streaming magic
    zip.finalize(); // finalize the archive
  }
}
