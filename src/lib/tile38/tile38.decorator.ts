import { Inject } from '@nestjs/common';

import { TILE38_TOKEN } from './tile38.constant';

export const InjectTile38 = () => Inject(TILE38_TOKEN);
