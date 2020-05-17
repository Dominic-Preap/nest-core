import { Controller, Get, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { Excel4NodeService } from './excel4node.service';

@ApiBearerAuth()
@ApiTags('Example - Excel4Node')
@Controller('example/excel4node')
export class Excel4NodeController {
  constructor(private readonly service: Excel4NodeService) {}

  @Get()
  @ApiOperation({ summary: 'Export as Excel File' })
  exportExcel(@Res() res: Response) {
    return this.service.start(res);
  }
}
