import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
  EntityInt32,
  EntityDateTime,
} from '@nestjs/azure-database';

@EntityPartitionKey('cats')
@EntityRowKey('id')
export class Cat {
  @EntityString() url: string;
  @EntityInt32() rating: number;
  @EntityDateTime() createdAt: Date;

  constructor(cat?: Partial<Cat>) {
    Object.assign(this, cat);
  }
}
