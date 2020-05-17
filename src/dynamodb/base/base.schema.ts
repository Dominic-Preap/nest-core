import { attribute } from '@aws/dynamodb-data-mapper-annotations';

export class BaseDataObject {
  @attribute({ defaultProvider: () => new Date().getTime() })
  createdDate!: number;

  @attribute()
  createdBy!: string;

  @attribute({ defaultProvider: () => new Date().getTime() })
  updatedDate!: number;

  @attribute()
  updatedBy!: string;
}
