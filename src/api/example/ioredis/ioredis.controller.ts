import { Controller, Get, Optional } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Redis } from 'ioredis';

import { InjectIORedis } from '@lib/ioredis';

@ApiBearerAuth()
@ApiTags('Example - IORedis')
@Controller('example/ioredis')
export class IORedisController {
  constructor(@Optional() @InjectIORedis() private readonly redis: Redis) {}

  @Get()
  @ApiOperation({ summary: 'Set Redis Expiry Example' })
  async setRedisExpiry() {
    const types = ['ex:reminder', 'ex:notification'];
    const type = types[Math.floor(Math.random() * types.length)];
    const key = Math.random();
    this.redis
      .multi() // Chain multiple redis function
      .set(`tmp:reminder:${key}`, JSON.stringify({ name: 'My Name', age: 18 })) // Must be string | tmp:reminder:id
      .setex(`${type}:${key}`, 10, null as any) // 10 seconds
      .exec();
  }
}
