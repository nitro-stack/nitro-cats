import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CatDto, Cat } from './cat';

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  constructor(private httpClient: HttpClient) {}

  getCats(orderBy: 'latest' | 'rating' = 'latest'): Observable<Cat[] | null> {
    return this.httpClient.get(`/cats?orderBy=${orderBy}`).pipe(
      map((catDtos: CatDto[]) => catDtos.map(Cat.fromApi)),
      catchError(error => {
        console.error(`Error, cannot get cats:`, error);
        return of(null);
      })
    );
  }

  submitCat() {}

  rateCat(id: number): Observable<Cat[] | null> {
    return null;
  }
}
