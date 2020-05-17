import { HttpAdapterHost } from '@nestjs/core';

import { I18NextLib } from './i18next';
import { I18NEXT_TOKEN } from './i18next.constant';

export const I18NextProvider = {
  inject: [HttpAdapterHost],
  provide: I18NEXT_TOKEN,
  useFactory: (httpAdapterHost: HttpAdapterHost) => {
    return new I18NextLib(httpAdapterHost);
  }
};
