import { Body, Controller, Get, Optional, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { InjectTile38, Tile38 } from '@lib/tile38';

@ApiTags('Example - Tile38')
@Controller('example/tile38')
export class Tile38Controller {
  constructor(@Optional() @InjectTile38() private readonly tile38: Tile38) {
    this.subscribe();
  }

  @Get('server')
  server() {
    return this.tile38.server();
  }

  @Get('setup')
  async setup() {
    const arr: [number, number][] = [
      [11.575063, 104.922874],
      [11.575029, 104.923208],
      [11.576385, 104.924148],
      [11.576887, 104.922436],
      [11.575933, 104.920833],
      [11.575961, 104.921063],
      [11.575633, 104.921415]
    ];
    let num = 1;
    for (const point of arr) {
      await this.tile38.set({
        key: 'fleet',
        id: `truck${num}`,
        point,
        fields: { speed: +(Math.random() * 1000).toFixed(1), age: 21 }
      });
      num++;
    }
  }

  @Get('get-truck')
  get() {
    return this.tile38.get({
      key: 'fleet',
      id: 'truck1',
      withFields: true,
      type: 'BOUNDS'
    });
  }

  @Get('intersects')
  intersects() {
    return this.tile38.intersects({
      key: 'fleet',
      noFields: false,
      limit: 2,
      // where: { speed: { min: 500, max: '+inf' } },
      // whereIn: { speed: [462.5, 853.4] },
      // whereEval: ['return FIELDS.speed < ARGV[1] * 1', 200],
      circle: { lat: 11.575105, lon: 104.922686, meters: 500 },
      output: 'ids'
    });
  }

  @Get('hook')
  createHook() {
    return this.tile38.sethook({
      name: 'warehouse',
      endpoint: 'http://localhost:3000/example/tile38/hook',
      meta: { server: 'node', product: 'testing' },
      key: 'fleet',
      type: 'nearby',
      point: { lat: 33.5123, lon: -112.2693, meters: 500 },
      where: { speed: { min: 30, max: '+inf' } },
      detect: ['cross', 'enter', 'inside'],
      output: 'ids'
    });
  }

  @Post('hook')
  hook(@Body() body: any) {
    console.log('body', body);
  }

  subscribe() {
    // this.tile38
    //   .setchan({
    //     name: 'warehouse3',
    //     type: 'nearby',
    //     key: 'fleet',
    //     point: { lat: 33.5123, lon: -112.2693, meters: 500 },
    //     output: 'bounds',
    //     commands: ['del', 'drop'],
    //     nodWell: true
    //   })
    //   .then(x => console.log('success'));

    this.tile38.subscribe(['warehouse3'], (channel, data) => {
      console.log(`Channel: ${channel}, Data: ${data}`);
    });
  }
}
