import { Component, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { tap, debounceTime, map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

import { Cat } from '../cat';
import { CatsService } from '../cats.service';
import { AdminService } from '@app/admin.service';

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

  @Output() deleted = new EventEmitter<Cat>();

  get cat(): Cat {
    return this._cat;
  }

  get isAdmin(): boolean {
    return this.adminService.isAdmin;
  }

  private _cat: Cat;
  private paws = new Subject<number>();
  private pawsSubscription: Subscription;

  constructor(
    private catsService: CatsService,
    private adminService: AdminService
  ) {
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

  delete() {
    this.catsService.removeCat(this.cat.id).subscribe(null, error => {
      console.error("Could no delete cat", error);
    });
    this.deleted.emit(this.cat);
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
