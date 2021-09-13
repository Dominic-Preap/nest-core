import { Logger, UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { ExceptionFilter } from './socket.filter';

@UseFilters(ExceptionFilter)
@WebSocketGateway({ namespace: 'app' })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;
  private logger = new Logger('AppGateway');

  handleConnection(socket: Socket) {
    this.logger.log(`Socket ID: ${socket.id} connected!`);
  }

  handleDisconnect(socket: Socket) {
    this.logger.log(`Socket ID: ${socket.id} disconnected!`);
  }

  @SubscribeMessage('welcome')
  onEvent(): WsResponse<string> {
    throw new WsException('Error Testing');
    return { data: 'WELCOME APP', event: 'welcome' };
  }

  emit(eventName: string, body: any) {
    this.server.emit(eventName, body);
  }
}
