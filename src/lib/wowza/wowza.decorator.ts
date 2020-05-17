import { Inject } from '@nestjs/common';

import { WOWZA_TOKEN } from './wowza.constant';

export const InjectWowza = () => Inject(WOWZA_TOKEN);
