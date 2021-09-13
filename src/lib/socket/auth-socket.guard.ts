import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

// import { verify } from 'jsonwebtoken';
// import { promisify } from 'util';

// import { ConfigService } from '@lib/config';

@Injectable()
export class AuthSocketGuard implements CanActivate {
  // constructor(private readonly config: ConfigService) {}

  async canActivate(context: ExecutionContext) {
    const socket = context.switchToWs().getClient<Socket>();
    const accessToken = socket.handshake.query.accessToken;

    if (!accessToken) throw new WsException('Missing token.');

    // const decoded: any = await promisify(verify)(accessToken, this.config.env.JWT_SECRET).catch(e => {
    //   throw new WsException(e.name + ' ' + e.message);
    // });
    // const jwtDecoded: { id: string } = decoded;

    // ! IMPORTANT: performance considering
    // const user = await User.findById(jwtDecoded.id);
    // if (!user || user.status !== 'active') throw new WsException('Unknown User');
    // socket.join(jwtDecoded.id);
    return true;
  }
}
