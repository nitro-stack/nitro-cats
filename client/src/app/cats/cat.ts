export interface CatDto {
  readonly id: string;
  readonly createdAt: string;
  readonly rating: number;
  readonly url: string;
}

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
      ...catDto,
      createdAt: new Date(catDto.createdAt)
    });
  }
}
