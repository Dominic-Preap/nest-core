import { ConfigService } from '../config';
import { AWSLib } from './aws';
import { AWS_TOKEN } from './aws.constant';
import { AWSConfig } from './aws.dto';

export const AWSProvider = {
  inject: [ConfigService],
  provide: AWS_TOKEN,
  useFactory: (configService: ConfigService) => {
    const config = configService.validate('AWSModule', AWSConfig);
    return new AWSLib(config);
  }
};
