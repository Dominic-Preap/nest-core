import { Inject } from '@nestjs/common';

import { IOREDIS_PUB_SUB_TOKEN, IOREDIS_TOKEN } from './ioredis.constant';

export const InjectIORedis = () => Inject(IOREDIS_TOKEN);
export const InjectIORedisPubSub = () => Inject(IOREDIS_PUB_SUB_TOKEN);
