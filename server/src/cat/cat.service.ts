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

  async addCat(url: string): Promise<Cat> {
    const cat = new Cat({
      url: url,
      rating: 0
    });
    return await this.catRepository.create(cat);
  }

  async incrementRating(key: string, rating: number): Promise<Cat> {
    if (rating < 0 || rating > 10) {
      return Promise.reject("rating must be a number between 0 and 10");
    } else {
      const cat = await this.catRepository.find(key, new Cat({}));
      cat.rating = cat.rating + rating;
      return await this.catRepository.update(key, cat);
    }
  }
  
  async update(key: string, cat: Partial<Cat>): Promise<Cat> {
    return await this.catRepository.update(key, cat);
  }

  async delete(rowKey: string, cat: Cat): Promise<AzureTableStorageResponse> {
    return await this.catRepository.delete(rowKey, cat);
  }
}
