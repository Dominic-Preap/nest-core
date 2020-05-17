import { Inject } from '@nestjs/common';

import { MAILER_TOKEN } from './mailer.constant';

export const InjectMailer = () => Inject(MAILER_TOKEN);
