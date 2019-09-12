import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Cat } from '../cat';
import { CatsService, pageLoadCount } from '../cats.service';
import { finalize, catchError } from 'rxjs/operators';

@Component({
  selector: 'nc-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.scss']
})
export class CatsListComponent implements OnInit {
  cats: Cat[] = [];
  orderBy: 'latest' | 'rating';
  page: number;
  loading = false;
  loadError = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private catsService: CatsService
  ) {}

  ngOnInit() {
    this.page = 1;
    this.orderBy =
      (this.activatedRoute.snapshot.data &&
        this.activatedRoute.snapshot.data.orderBy) ||
      'latest';
    this.loadCats();
  }

  loadMore() {
    if (this.cats.length === pageLoadCount * this.page) {
      this.loadCats(this.page++);
    } else {
      console.info('No more cats to load!');
    }
  }

  private loadCats(page = 0) {
    this.loading = true;
    this.catsService
      .getCats(this.orderBy, page)
      .pipe(
        catchError(() => {
          this.loadError = true;
          return of([]);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(cats => {
        this.cats.push(...cats);
      });
  }
}
