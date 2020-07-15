import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisIoAdapter from 'socket.io-redis';

import { ConfigService } from '@lib/config';

export class RedisIoAdapter extends IoAdapter {
  private redisAdapter: redisIoAdapter.RedisAdapter;

  constructor(app: INestApplication, config: ConfigService) {
    super(app);

    this.redisAdapter = redisIoAdapter({
      host: config.get('REDIS_HOST'),
      port: +config.get('REDIS_PORT'),
      auth_pass: config.get('REDIS_AUTH_PASS')
    });
  }

  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.redisAdapter);
    return server;
  }
}
