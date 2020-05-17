import { Logger } from '@nestjs/common';
import * as Redis from 'ioredis';

import { ConfigService } from '../config';
import { IOREDIS_PUB_SUB_TOKEN, IOREDIS_TOKEN } from './ioredis.constant';
import { IORedisConfig } from './ioredis.dto';

/*
|--------------------------------------------------------------------------
| References
|--------------------------------------------------------------------------
| https://medium.com/@micah1powell/using-redis-keyspace-notifications-for-a-reminder-service-with-node-c05047befec3
|
*/

const logger = new Logger('IORedisModule');

let redis: Redis.Redis;
let subscriber: Redis.Redis;

export const IORedisProvider = {
  inject: [ConfigService],
  provide: IOREDIS_TOKEN,
  useFactory: (configService: ConfigService) => {
    const config = configService.validate('IORedisModule', IORedisConfig);

    // This will prevent reinitialize redis and cause maximum redis connection
    if (redis) return redis;

    redis = new Redis({
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
      password: config.REDIS_AUTH_PASS
    });

    redis.on('error', e => logger.error(e.message, e.stack));
    redis.on('end', () => logger.warn('Ended'));
    redis.on('reconnecting', () => logger.log('Reconnecting'));
    redis.on('connect', () => logger.log('Connecting'));
    redis.on('ready', () => redis.config('SET', 'notify-keyspace-events', 'Ex')); // ! Important
    redis.on('ready', () => logger.log('Connected'));
    return redis;
  }
};

export const IORedisPubSubProvider = {
  inject: [ConfigService],
  provide: IOREDIS_PUB_SUB_TOKEN,
  useFactory: (configService: ConfigService) => {
    const config = configService.validate('IORedisModule:PubSub', IORedisConfig);

    // This will prevent reinitialize redis and cause maximum redis connection
    if (subscriber) return subscriber;

    subscriber = new Redis({
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
      password: config.REDIS_AUTH_PASS
    });

    subscriber.on('ready', () => logger.log('PubSub Connected'));
    subscriber.subscribe('__keyevent@0__:expired'); // ! Important
    return subscriber;
  }
};
