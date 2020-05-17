import { Provider } from '@nestjs/common';

import { ConfigService } from '../config';
import { CryptoConfig } from './crypto.dto';
import { CryptoService } from './crypto.service';

export const CryptoProvider: Provider = {
  inject: [ConfigService],
  provide: CryptoService,
  useFactory: async (configService: ConfigService) => {
    const config = configService.validate('CryptoModule', CryptoConfig);
    return new CryptoService(config);
  }
};
