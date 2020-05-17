import { Controller, Get, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { I18Next, i18next, I18NextTranslate } from '@lib/i18next';

@ApiTags('Example - I18Next')
@Controller('example/i18next')
export class I18NextController {
  @Get('hello')
  @ApiHeader({ name: 'Accept-Language', required: false })
  @ApiQuery({ name: 'lng', required: false })
  @ApiOperation({ summary: 'Localization' })
  async translate(@I18Next() i18n: i18next) {
    return { message: i18n.t<string, I18NextTranslate>('Hello') };
  }

  @Get('my-name')
  @ApiHeader({ name: 'x-language', required: false })
  @ApiQuery({ name: 'lng', required: false })
  @ApiOperation({ summary: 'Localization' })
  async replace(@I18Next() i18n: i18next, @Query('name') name: string) {
    return { message: i18n.t<string, I18NextTranslate>('MyName', { replace: { name } }) };
  }
}
