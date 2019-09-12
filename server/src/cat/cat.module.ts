import { Module } from '@nestjs/common';
import { AzureTableStorageModule } from '@nestjs/azure-database';
import { CatController } from './cat.controller';
import { Cat } from './cat.entity';
import { CatService } from './cat.service';

@Module({
    imports: [
      AzureTableStorageModule.forFeature(Cat, {
        table: 'Cat',
        createTableIfNotExists: true,
      }),
    ],
    providers: [CatService],
    controllers: [CatController],
  })
export class CatModule {}
