import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Cat } from './cat';
import { CatListDto } from './cat-list.dto';
import { CatList } from './cat-list';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  constructor(private httpClient: HttpClient) {}

  getCats(
    orderBy: 'latest' | 'rating' = 'latest',
    continuationToken?: string
  ): Observable<CatList | null> {
    return this.httpClient
      .get(
        `/cats?orderBy=${orderBy}${
          continuationToken ? '&continuationToken=' + continuationToken : ''
        }`
      )
      .pipe(
        map((catListDto: CatListDto) => CatList.fromApi(catListDto)),
        catchError(error => {
          console.error(`Error, cannot get cats:`, error);
          return of(null);
        })
      );
  }

  removeCat(id: string): Observable<void> {
    return this.httpClient.delete(`/cats/${id}`).pipe(
      catchError(error => {
        console.error(`Error, cannot delete cat with id: ${id}`, error);
        return of(null);
      })
    );
  }

  pawCat(id: string): Observable<Cat[] | null> {
    return this.httpClient.post(`/cats/${id}/paw`, { rating: 1 }).pipe(
      catchError(error => {
        console.error(`Error, cannot paw cat with id: ${id}`, error);
        return of(null);
      })
    );
  }
}
