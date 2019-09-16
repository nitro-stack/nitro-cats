import { CatDto } from './cat.dto';

export class Cat {
  readonly id: string;
  readonly createdAt: Date;
  rating: number;
  readonly url: string;

  constructor(data: Cat) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.rating = data.rating;
    this.url = data.url;
  }

  static fromApi(catDto: CatDto): Cat {
    return new Cat({
      id: catDto.RowKey,
      createdAt: new Date(catDto.createdAt),
      rating: catDto.rating,
      url: catDto.url
    });
  }
}
