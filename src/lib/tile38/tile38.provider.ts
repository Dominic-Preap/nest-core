import { Logger } from '@nestjs/common';
import * as Redis from 'ioredis';

import { ConfigService } from '../config';
import { Tile38 } from './tile38';
import { TILE38_TOKEN } from './tile38.constant';
import { Tile38Config } from './tile38.dto';

let redis: Redis.Redis;

export const Tile38Provider = {
  inject: [ConfigService],
  provide: TILE38_TOKEN,
  useFactory: (configService: ConfigService) => {
    const logger = new Logger('Tile38Module');
    const config = configService.validate('Tile38Module', Tile38Config);

    // This will prevent reinitialize redis and cause maximum redis connection
    if (redis) return redis;

    redis = new Redis({
      host: config.TILE38_HOST,
      port: config.TILE38_PORT,
      password: config.TILE38_AUTH_PASS
    });

    redis.on('error', e => logger.error(e.message, e.stack));
    redis.on('end', () => logger.warn('Ended'));
    redis.on('reconnecting', () => logger.log('Reconnecting'));
    redis.on('connect', () => logger.log('Connecting'));
    redis.on('ready', () => logger.log('Connected'));
    return new Tile38(redis);
  }
};
