import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Cat } from '../cat';
import { CatsService } from '../cats.service';
import { finalize, catchError } from 'rxjs/operators';
import { CatList } from '../cat-list';

@Component({
  selector: 'nc-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.scss']
})
export class CatsListComponent implements OnInit {
  cats: Cat[] = [];
  orderBy: 'latest' | 'rating';
  continuationToken: string;
  loading = false;
  loadError = false;
  layout = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private catsService: CatsService
  ) {}

  ngOnInit() {
    this.continuationToken = null;
    this.orderBy =
      (this.activatedRoute.snapshot.data &&
        this.activatedRoute.snapshot.data.orderBy) ||
      'latest';
    this.loadCats();
  }

  loadMore() {
    if (this.continuationToken) {
      this.loadCats(this.continuationToken);
    } else {
      console.info('No more cats to load!');
    }
  }

  onDeleteCat(catToDelete: Cat) {
    this.cats = this.cats.filter(cat => cat.id !== catToDelete.id);
  }

  private loadCats(continuationToken?: string) {
    this.loading = true;
    this.catsService
      .getCats(this.orderBy, continuationToken)
      .pipe(
        catchError(() => {
          this.loadError = true;
          return of(new CatList({ cats: [] }));
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(catList => {
        this.continuationToken = catList.continuationToken;
        this.cats.push(...catList.cats);
      });
  }
}
