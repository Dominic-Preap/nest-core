import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as Redis from 'ioredis';
import { createAdapter, RedisAdapter } from 'socket.io-redis';

import { ConfigService } from '@lib/config';

let pubClient: Redis.Redis;
let subClient: Redis.Redis;

export class RedisIoAdapter extends IoAdapter {
  private redisAdapter: RedisAdapter;

  constructor(app: INestApplication, config: ConfigService) {
    super(app);

    if (!pubClient && !subClient) {
      pubClient = new Redis({
        host: config.get('REDIS_HOST'),
        port: +config.get('REDIS_PORT'),
        password: config.get('REDIS_AUTH_PASS')
      });
      subClient = pubClient.duplicate();
    }
    this.redisAdapter = createAdapter({ pubClient, subClient });
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.redisAdapter);
    return server;
  }
}
