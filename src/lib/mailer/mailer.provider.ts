import { ConfigService } from '../config';
import { Mailer } from './mailer';
import { MAILER_TOKEN } from './mailer.constant';
import { MailerConfig } from './mailer.dto';

export const mailerProvider = {
  inject: [ConfigService],
  provide: MAILER_TOKEN,
  useFactory: (configService: ConfigService) => {
    const config = configService.validate('MailerModule', MailerConfig);
    return new Mailer(config);
  }
};
