import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthUserX } from '@common';

// import { Types } from 'mongoose';
// import { Audit } from '@schema';

@Injectable()
export class AuditingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const date = Date.now();
    return next.handle().pipe(tap(result => this.saveAudit(context, date, result)));
  }

  private async saveAudit(context: ExecutionContext, date: number, result: any) {
    const req = context.switchToHttp().getRequest<Request & { authUser: AuthUserX }>();
    const { method, url, body, authUser } = req;
    if (method === 'GET' || !authUser) return; // Save only apply on authUser or method is not GET

    const className = context.getClass().name;
    const handler = context.getHandler().name;
    const duration = Date.now() - date;
    const time = new Date();

    const data = {
      body: JSON.stringify(body),
      className,
      duration,
      handler,
      method,
      result: JSON.stringify(result),
      time,
      url,
      // userId: Types.ObjectId(authUser._id),
      username: authUser.username
    };
    // TODO: create your own Audit table
    // await Audit.create(data);
    console.log(data);
  }
}
