import { Cat } from './cat';
import { CatListDto } from './cat-list.dto';

export class CatList {
  readonly cats: Cat[];
  readonly continuationToken?: string | null;

  constructor(data: CatList) {
    this.cats = data.cats;
    this.continuationToken = data.continuationToken;
  }

  static fromApi(catListDto: CatListDto): CatList {
    return new CatList({
      cats: catListDto.entries.map(catDto => Cat.fromApi(catDto)),
      continuationToken: catListDto.continuationToken
        ? JSON.stringify(catListDto.continuationToken)
        : undefined
    });
  }
}
