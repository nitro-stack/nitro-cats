import { Component, Input, OnDestroy } from '@angular/core';
import { catchError, tap, debounceTime, map } from 'rxjs/operators';
import { of, Subject, Subscription } from 'rxjs';

import { Cat } from '../cat';
import { CatsService } from '../cats.service';

@Component({
  selector: 'nc-cat-item',
  templateUrl: './cat-item.component.html',
  styleUrls: ['./cat-item.component.scss']
})
export class CatItemComponent implements OnDestroy {
  rating: string;

  @Input() set cat(cat: Cat) {
    this._cat = cat;
    this.updateRating();
  }

  get cat(): Cat {
    return this._cat;
  }

  private _cat: Cat;
  private paws = new Subject<number>();
  private pawsSubscription: Subscription;

  constructor(private catsService: CatsService) {
    let count: number = 0;

    this.pawsSubscription = this.paws
      .pipe(
        tap(() => {
          if (count < 10) {
            count++;
            this.cat.rating++;
            this.updateRating();
          }
        }),
        debounceTime(500),
        map(() => count),
        tap(() => (count = 0))
      )
      .subscribe(paws => this.sendRatingUpdate(paws));
  }

  ngOnDestroy() {
    this.pawsSubscription.unsubscribe();
  }

  paw() {
    this.paws.next();
  }

  private sendRatingUpdate(paws: number) {
    this.catsService.pawCat(this.cat.id, paws).subscribe(null, error => {
      // Restore initial rating, as we did optimistic update
      this.cat.rating -= paws;
      this.updateRating();
      console.error("Could no paw cat :'(", error);
    });
  }

  private updateRating() {
    if (this.cat.rating > 1000) {
      this.rating = `${Math.floor(this.cat.rating / 100) / 10}K`;
    } else {
      this.rating = String(this.cat.rating);
    }
  }
}
