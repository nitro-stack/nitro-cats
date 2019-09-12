import { EntityPartitionKey, EntityRowKey, EntityString } from '@nestjs/azure-database';

@EntityPartitionKey('CatID')
@EntityRowKey('CatName')
export class Cat {
  @EntityString() name: string;
  @EntityString() message: string;
}
