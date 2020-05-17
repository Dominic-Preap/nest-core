import { Inject } from '@nestjs/common';

import { SOCIAL_TOKEN } from './social.constant';

export const InjectSocial = () => Inject(SOCIAL_TOKEN);
