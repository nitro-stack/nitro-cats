import { Component, Input } from '@angular/core';

import { Cat } from '../cat';
import { CatsService } from '../cats.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'nc-cat-item',
  templateUrl: './cat-item.component.html',
  styleUrls: ['./cat-item.component.scss']
})
export class CatItemComponent {
  rating: string;

  @Input() set cat(cat: Cat) {
    this._cat = cat;
    this.updateRating();
  }

  get cat(): Cat {
    return this._cat;
  }

  private _cat: Cat;

  constructor(private catsService: CatsService) {}

  async paw() {
    this.cat.rating++;
    this.updateRating();
    this.catsService.pawCat(this.cat.id)
      .pipe(catchError(error => {
        // Restore rating
        this.cat.rating--;
        this.updateRating();
        console.error("Could no paw cat :'(", error);
        return of(null);
      }))
      .subscribe();
  }

  private updateRating() {
    if (this.cat.rating > 1000) {
      this.rating = `${Math.floor(this.cat.rating / 100) / 10}K`;
    } else {
      this.rating = String(this.cat.rating);
    }
  }
}
