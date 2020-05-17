import { ConditionExpression, equals } from '@aws/dynamodb-expressions';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

import { AWSLib, InjectAWS } from '@lib/aws';

import * as I from './user.interface';
import { UserObject } from './user.schema';

@Injectable()
export class DynamoDBUserService {
  constructor(@InjectAWS() private readonly aws: AWSLib) {}

  async create(body: any) {
    const data = Object.assign(new UserObject(), body);
    return this.aws.mapper.put<UserObject>(data);
  }

  async findOne(opt: I.FindOneOpt) {
    const result = await this.findAll({ ...opt, limit: 1 });
    return result.length ? result[0] : null;
  }

  async findAll(opt: I.FindAllOpt) {
    const conditions = this.filter(opt);

    const list = this.aws.mapper.scan(UserObject, {
      projection: ['email', 'firstName', 'address'],
      indexName: opt.indexName,
      filter: { type: 'And', conditions },
      limit: opt.limit
    });

    const items: UserObject[] = [];
    for await (const item of list) {
      items.push(item);
    }
    return items;
  }

  private filter(opt: I.FindAllOpt) {
    const filters: any = [
      // ---
      filterByStatus(opt.status),
      filterByEmail(opt.email),
      filterByLogo(opt.logo)
    ];
    return _.compact(filters) as ConditionExpression[];
  }
}

type T = ConditionExpression | null;
const filterByStatus = (v?: string): T => v ? ({ subject: 'status',  ...equals(v) }) : null; // prettier-ignore
const filterByEmail  = (v?: string): T => v ? ({ subject: 'email',   ...equals(v) }) : null; // prettier-ignore
const filterByLogo   = (v?: string): T => v ? ({ subject: 'profile.logo',   ...equals(v) }) : null; // prettier-ignore
