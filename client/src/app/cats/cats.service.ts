import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Cat } from './cat';
import { CatDto } from './cat.dto';

export const pageLoadCount = 30;

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  constructor(private httpClient: HttpClient) {}

  getCats(
    orderBy: 'latest' | 'rating' = 'latest',
    page: number = 0
  ): Observable<Cat[] | null> {
    return this.httpClient
      .get(`/cats?orderBy=${orderBy}&page=${page}&count=${pageLoadCount}`)
      .pipe(
        map((catDtos: CatDto[]) => catDtos.map(Cat.fromApi)),
        catchError(error => {
          console.error(`Error, cannot get cats:`, error);
          return of(null);
        })
      );
  }

  addCatLove(id: string): Observable<Cat[] | null> {
    console.log('aww!');
    return null;
  }
}
