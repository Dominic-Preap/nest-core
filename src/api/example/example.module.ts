import { Module } from '@nestjs/common';

import { DownloadController } from './download/download.controller';
import { Excel4NodeController } from './excel4node/excel4node.controller';
import { Excel4NodeService } from './excel4node/excel4node.service';
import { I18NextController } from './i18next/i18next.controller';
import { IORedisController } from './ioredis/ioredis.controller';
import { IORedisService } from './ioredis/ioredis.service';
import { PDFMakeController } from './pdfmake/pdfmake.controller';
import { PdfMakeService } from './pdfmake/pdfmake.service';
import { SequelizeController } from './sequelize/sequelize.controller';
import { SoapController } from './soap/soap.controller';
import { Tile38Controller } from './tile38/tile38.controller';
import { TypeORMController } from './typeorm/typeorm.controller';
import { UploadController } from './upload/upload.controller';

@Module({
  controllers: [
    // -----------------
    DownloadController,
    Excel4NodeController,
    I18NextController,
    IORedisController,
    PDFMakeController,
    SequelizeController,
    SoapController,
    Tile38Controller,
    TypeORMController,
    UploadController
  ],
  providers: [
    // -----------------
    Excel4NodeService,
    IORedisService,
    PdfMakeService
  ]
})
export class ExampleModule {}
