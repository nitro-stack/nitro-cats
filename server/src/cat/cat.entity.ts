import {
  EntityPartitionKey,
  EntityRowKey,
  EntityString,
  EntityInt32,
} from '@nestjs/azure-database';

@EntityPartitionKey('CatID')
@EntityRowKey('CatName')
export class Cat {
  @EntityString() url: string;
  @EntityInt32() rating: number;

  constructor(partial: Partial<Cat>) {
    Object.assign(this, partial);
  }
}
