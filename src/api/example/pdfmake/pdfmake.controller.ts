import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { PdfMakeService } from './pdfmake.service';

@ApiBearerAuth()
@ApiTags('Example - PDFMake')
@Controller('example/pdfmake')
export class PDFMakeController {
  constructor(private readonly service: PdfMakeService) {}

  @Get(':type')
  @ApiOperation({ summary: 'Create and Download PDF File' })
  pdfMake(@Param('type') type: string, @Res() res: Response) {
    switch (type) {
      case 'download':
        return this.service.download(res);
      case 'url':
        return this.service.getDataUrl(res);
      case 'write':
      default:
        return this.service.writeFile(res);
    }
  }
}
