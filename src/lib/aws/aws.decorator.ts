import { Inject } from '@nestjs/common';

import { AWS_TOKEN } from './aws.constant';

export const InjectAWS = () => Inject(AWS_TOKEN);
