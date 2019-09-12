import { Injectable } from '@nestjs/common';
import { Repository, AzureTableStorageResponse, AzureTableStorageResultList, InjectRepository } from '@nestjs/azure-database';
import { Cat } from './cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>) {}

  async find(rowKey: string, cat: Cat): Promise<Cat> {
    return await this.catRepository.find(rowKey, cat);
  }

  async findAll(): Promise<AzureTableStorageResultList<Cat>> {
    return await this.catRepository.findAll();
  }

  async create(cat: Cat): Promise<Cat> {
    return await this.catRepository.create(cat);
  }

  async update(key: string, cat: Partial<Cat>): Promise<Cat> {
    return await this.catRepository.update(key, cat);
  }

  async delete(rowKey: string, cat: Cat): Promise<AzureTableStorageResponse> {
    return await this.catRepository.delete(rowKey, cat);
  }
}
