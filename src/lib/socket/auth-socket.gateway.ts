import { Logger, UseFilters } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';

import { ExceptionFilter } from './socket.filter';

@UseFilters(ExceptionFilter)
@WebSocketGateway({ namespace: 'auth', transports: ['websocket'] })
export class AuthSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server!: SocketIO.Server;
  private logger = new Logger('AuthGateway');

  handleConnection(socket: SocketIO.Socket) {
    // ! TODO: need to validate hash before join room, check VIP project for more info
    // const token = socket.handshake.query.token;
    // this.service
    //   .validateHash(token)
    //   .then(user => {
    //     const { id, organizationId } = user;
    //     socket.join(this.organizationRoom(organizationId));
    //     socket.join(this.userRoom(id));
    //     this.logger.log(`Socket ID: ${id}@${socket.id} connected!`);
    //   })
    //   .catch(x => socket.disconnect());
  }

  handleDisconnect(socket: SocketIO.Socket) {
    this.logger.log(`Socket ID: ${socket.id} disconnected!`);
  }

  @SubscribeMessage('WELCOME')
  onEvent(client: SocketIO.Client, data: any) {
    return { data: 'WELCOME AUTH', event: 'WELCOME' };
  }

  emitByUserId(userId: number, event: string, body: any) {
    this.server.to(this.userRoom(userId)).emit(event, body);
  }

  private userRoom = (userId: number) => `user:${userId}`;
}
