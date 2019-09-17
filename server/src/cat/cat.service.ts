import { Injectable } from '@nestjs/common';
import {
  Repository,
  AzureTableStorageResponse,
  AzureTableStorageResultList,
  AzureTableContinuationToken,
  InjectRepository,
} from '@nestjs/azure-database';
import { Cat } from './cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  async find(id: string, cat: Cat): Promise<Cat> {
    return await this.catRepository.find(id, cat);
  }

  async findAll(
    currentToken?: AzureTableContinuationToken,
  ): Promise<AzureTableStorageResultList<Cat>> {
    return await this.catRepository.findAll(undefined, currentToken);
  }

  async findAllByRating(
    descending = true,
    currentToken?: AzureTableContinuationToken,
  ): Promise<AzureTableStorageResultList<Cat>> {
    const res = await this.catRepository.findAll(undefined, currentToken);
    res.entries.sort(function(a, b) {
      if (descending) {
        if (a.rating < b.rating) return 1;
        if (a.rating > b.rating) return -1;
      } else {
        if (a.rating < b.rating) return -1;
        if (a.rating > b.rating) return 1;
      }
      return 0;
    });
    return res;
  }

  async create(url: string): Promise<Cat> {
    const cat = new Cat({
      url,
      rating: 0,
      createdAt: new Date(),
    });
    return await this.catRepository.create(cat);
  }

  async incrementRating(key: string, rating: number): Promise<Cat> {
    const cat = await this.catRepository.find(key, new Cat());
    cat.rating += rating;
    return await this.catRepository.update(key, new Cat(cat));
  }

  async delete(id: string): Promise<AzureTableStorageResponse> {
    return await this.catRepository.delete(id, new Cat());
  }
}
