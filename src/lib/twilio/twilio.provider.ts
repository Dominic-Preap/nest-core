import { ConfigService } from '../config';
import { TwilioLib } from './twilio';
import { TWILIO_TOKEN } from './twilio.constant';
import { TwilioConfig } from './twilio.dto';

export const twilioProvider = {
  inject: [ConfigService],
  provide: TWILIO_TOKEN,
  useFactory: (configService: ConfigService) => {
    const config = configService.validate('TwilioModule', TwilioConfig);
    return new TwilioLib(config);
  }
};
