import { Controller, Get, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ExcelJSService } from './exceljs.service';

@ApiBearerAuth()
@ApiTags('Example - ExcelJS')
@Controller('example/ExcelJS')
export class ExcelJSController {
  constructor(private readonly service: ExcelJSService) {}

  @Get()
  @ApiOperation({ summary: 'Export as Excel File' })
  exportExcel(@Res() res: Response) {
    return this.service.start(res);
  }
}
