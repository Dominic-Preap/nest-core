import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment';

/**
 * The Rate Limit Guard inspired by `Express Rate Limit`
 *
 * @description For process detail, checkout `rate-limit.pu`
 * @see https://www.npmjs.com/package/express-rate-limit
 *
 * @param {number} [idleTime=60] `Second`. Time if not request within any second, will reset the object
 * @param {number} [blockTime=300] `Second`. Time that will block your request after you are reach the limit request
 * @param {number} [limitRequest=5] Number of Limit Request
 * @param {number} [message=''] Error Message
 */
export const RateLimiting = (idleTime = 60, blockTime = 300, limitRequest = 5, message = '') =>
  UseGuards(new RateLimitingGuard(idleTime, blockTime, limitRequest, message));

const ipStore: IpStore = {};
@Injectable()
class RateLimitingGuard implements CanActivate {
  constructor(
    private readonly idleTime: number,
    private readonly blockTime: number,
    private readonly limitRequest: number,
    private readonly message: string
  ) {}
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    const ip: string =
      (req.headers['x-forwarded-for'] as string) ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      '127.0.0.1';

    // Init new object or get it owns
    ipStore[ip] = { ...{ current: 0, idleDate: new Date() }, ...ipStore[ip] };

    // console.log('ip', ip);
    // console.log('ipStore', ipStore);

    // * Check limit request with current request (false request)
    // * current request reach limit then will throw Error
    // =======================================================
    if (ipStore[ip].current > this.limitRequest) {
      // * Check if expire date exist if not add a new one
      if (!ipStore[ip].expiredDate) {
        ipStore[ip].expiredDate = moment().add(this.blockTime, 'second').toDate();
      }

      // * Check if Block Time (countdown) is expired or will throw Error
      // * Block Connect after it reach the maximum requests (1 minute)
      const countdown = moment(ipStore[ip].expiredDate).diff(new Date(), 'second');
      // console.log('countdown', countdown);
      if (countdown > 0) {
        throw new ForbiddenException(
          this.message || 'Too many failed login attempts, Please wait a few minutes and try again.'
        );
      }

      // * Reset Object After Block Time (countdown) is expired
      delete ipStore[ip];
    }
    // * current request not reach limit yet, then check reset countdown
    // * (reset object after user is not requesting for a certain time)
    // ===============================================================
    else {
      // * Compare date for reset object (30 second if not request anything will reset the object)
      const idle = moment().diff(ipStore[ip].idleDate, 'second');

      // * if idle is reach then reset the object to start again
      if (idle > this.idleTime) delete ipStore[ip];
      // * Add current number request and set a new idle time
      // * current will check will Limit, idleDate will check with idleTime
      else {
        ipStore[ip].current++;
        ipStore[ip].idleDate = new Date();
      }
    }

    // Deduct the current request number if request success
    res.on('finish', () => (res.statusCode < 400 && ipStore[ip] ? ipStore[ip].current-- : null));

    return true;
  }
}

interface IpStore {
  [key: string]: {
    current: number;
    idleDate: Date;
    expiredDate: Date;
  };
}
