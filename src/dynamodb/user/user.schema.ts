import { embed } from '@aws/dynamodb-data-mapper';
import { attribute, autoGeneratedHashKey, table } from '@aws/dynamodb-data-mapper-annotations';

import { BaseDataObject } from '../base/base.schema';

class Address {
  @attribute()
  lat?: string;

  @attribute()
  lng?: string;
}

class Profile {
  @attribute()
  logo?: string;

  @attribute()
  nickName?: string;
}

@table('testing')
export class UserObject extends BaseDataObject {
  @autoGeneratedHashKey()
  id!: string;

  @attribute()
  firstName!: string;

  @attribute()
  lastName!: string;

  @attribute()
  email?: string;

  @attribute()
  status?: string;

  @attribute({ memberType: embed(Address) })
  address?: Array<Address>;

  @attribute({ valueConstructor: Profile })
  profile?: Profile;

  @attribute({ type: 'Collection', memberType: 'Number' })
  tags?: string[];
}
