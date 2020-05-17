import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac } from 'crypto';
import { Request } from 'express';

import { ConfigService } from '../../config';

@Injectable()
export class SendBirdWebhookGuard implements CanActivate {
  constructor(private readonly service: ConfigService) {}

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();

    const userAgent = req.get('user-agent');
    const signature = req.get('x-sendbird-signature');

    if (!signature || userAgent !== 'sendbird') {
      throw new UnauthorizedException(`This request doesn't contain a SendBird signature`);
    }

    return this.compare(signature, req.body);
  }

  private compare(signature: string, payload: any) {
    const secret = this.service.get('SENDBIRD_API_TOKEN');
    const digest = createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex'); // prettier-ignore
    if (signature !== digest) throw new UnauthorizedException('Request signature does not match');

    return true;
  }
}
