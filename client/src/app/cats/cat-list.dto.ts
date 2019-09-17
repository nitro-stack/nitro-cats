import { CatDto } from './cat.dto';

export interface CatListDto {
  readonly entries: CatDto[];
  readonly continuationToken?: Object | null;
}
