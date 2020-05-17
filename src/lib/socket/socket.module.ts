import { Global, Module } from '@nestjs/common';

import { AuthSocketGateway } from './auth-socket.gateway';
import { SocketGateway } from './socket.gateway';

@Global()
@Module({
  providers: [SocketGateway, AuthSocketGateway],
  exports: [SocketGateway, AuthSocketGateway]
})
export class SocketModule {}
