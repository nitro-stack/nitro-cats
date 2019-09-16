import { Module } from '@nestjs/common';
import { AzureStorageModule } from '@nestjs/azure-storage';
import { AzureTableStorageModule } from '@nestjs/azure-database';
import { CatController } from './cat.controller';
import { Cat } from './cat.entity';
import { CatService } from './cat.service';

@Module({
  imports: [
    AzureTableStorageModule.forFeature(Cat, {
      table: 'cats',
      createTableIfNotExists: true,
    }),
    AzureStorageModule.withConfig({
      sasKey: process.env.AZURE_STORAGE_SAS_KEY,
      accountName: process.env.AZURE_STORAGE_ACCOUNT,
      containerName: 'nitro-cats-container',
    }),
  ],
  providers: [CatService],
  controllers: [CatController],
})
export class CatModule {}
