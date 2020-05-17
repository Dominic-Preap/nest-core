import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

/**
 * @description The basic authenticate guard.
 */
export const ApiGuard = () => UseGuards(XApiGuard);

@Injectable()
class XApiGuard implements CanActivate {
  constructor(private readonly service: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const key = req.get('x-api-key') || '';

    const decoded: string = await this.service.verifyAsync(key).catch(e => {
      throw new UnauthorizedException(e.name + ' ' + e.message);
    });

    // TODO: use for static token, not recommended unless you know what are you doing
    if (decoded !== 'something') throw new ForbiddenException('Invalid API Key');
    return true;
  }
}
