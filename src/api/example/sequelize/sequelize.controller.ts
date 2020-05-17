import { Controller, Get, Optional, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';

import { InjectSequelize, ToArrayCreateLang, ToArrayUpdateLang } from '@lib/sequelize';
import { CatLocale } from '@models';

@ApiBearerAuth()
@ApiTags('Example - Sequelize')
@Controller('example/sequelize')
export class SequelizeController {
  constructor(@Optional() @InjectSequelize() private readonly db: Sequelize) {}

  @Get('seq')
  @ApiOperation({ summary: 'Get Sequelize Test' })
  async getSequelizeList() {
    // const language = await Test.findAll({ order: [['id', 'desc']] });
    // await User.$create({ encryptedKey: 'xxx' });
    // const user = await User.$findOne({ encryptedKey: 'xxx' });
    const test = await this.db.query('select 1 + 1', { plain: true });
    return { test };
  }

  @Post('seq')
  @ApiOperation({ summary: 'Sequelize Locale Create' })
  async setSequelizeLocaleCreate() {
    const bulkCreate = await ToArrayCreateLang(
      {
        en: { name: 'English Cat' },
        kh: { name: 'Khmer Cat' }
      },
      { catId: 2 }
    );
    return CatLocale.bulkCreate(bulkCreate);
  }

  @Put('seq')
  @ApiOperation({ summary: 'Sequelize Locale Update' })
  async setSequelizeLocaleUpdate() {
    const promises = await ToArrayUpdateLang(
      {
        en: { name: 'English Cat 1' },
        kh: { name: 'Khmer Cat 1' }
      },
      { catId: 1 },
      CatLocale
    );
    const result = await Promise.all(promises);
    return result;
  }
}
