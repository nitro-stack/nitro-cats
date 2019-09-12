import { EntityPartitionKey, EntityRowKey, EntityString, EntityIn32 } from '@nestjs/azure-database';

@EntityPartitionKey('CatID')
@EntityRowKey('CatName')
export class Cat {
  @EntityString() url: string;
  @EntityIn32() rating: number;
}