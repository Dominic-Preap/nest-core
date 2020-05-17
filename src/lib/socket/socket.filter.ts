import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException)
export class ExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    // const data = host.switchToWs().getData();
    // console.log('exception', exception);
    // console.log('data', data);
    const socket = host.switchToWs().getClient<SocketIO.Socket>();
    socket.emit('exception', {
      status: 'error',
      message: exception.message || `It's a message from the exception filter`
    });
  }
}
