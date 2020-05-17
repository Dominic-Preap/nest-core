import { Injectable } from '@nestjs/common';
import * as debug from 'debug';
import { Redis } from 'ioredis';

import { InjectIORedis, InjectIORedisPubSub } from '@lib/ioredis';

@Injectable()
export class IORedisService {
  private log = debug('api:ioredis');

  constructor(@InjectIORedisPubSub() private readonly sub: Redis, @InjectIORedis() private readonly redis: Redis) {
    this.sub.removeAllListeners('message');
    this.sub.on('message', async (channel: any, message: string) => {
      const [, type, key] = message.split(':'); // * Naming Convention : ex:TYPE:KEY
      this.log('TYPE', type);
      this.log('KEY', key);

      switch (type) {
        case 'reminder':
          this.userReminder(key);
          break;

        case 'notification':
          this.publishNotification(key);
          break;

        default:
          break;
      }
    });
  }

  async userReminder(value: string) {
    // * For more, check at setRedisExpiry() in ioredis.controller.ts
    const key = `tmp:reminder:${value}`;
    await this.redis.del(key);
    this.log('USER REMINDER ALERT');
  }

  async publishNotification(value: string) {
    // * For more, check at setRedisExpiry() in ioredis.controller.ts
    const key = `tmp:reminder:${value}`;
    const data = await this.redis.get(key).then(x => JSON.parse(x || ''));
    await this.redis.del(key);
    this.log('PUSH NOTIFICATION TO ALL USERS', data);
  }
}
