import { Component, Input } from '@angular/core';

import { Cat } from '../cat';
import { CatsService } from '../cats.service';

@Component({
  selector: 'nc-cat-item',
  templateUrl: './cat-item.component.html',
  styleUrls: ['./cat-item.component.scss']
})
export class CatItemComponent {
  rating: string;
  imgLoaded = false;

  @Input() set cat(cat: Cat) {
    this._cat = cat;
    this.updateRating();
  }

  get cat(): Cat {
    return this._cat;
  }

  private _cat: Cat;

  constructor(private catsService: CatsService) {}

  addLove() {
    this.cat.rating++, this.updateRating();
    this.catsService.addCatLove(this.cat.id);
  }

  onLoaded() {
    this.imgLoaded = true;
  }

  private updateRating() {
    if (this.cat.rating > 1000) {
      this.rating = `${Math.floor(this.cat.rating / 100) / 10}K`;
    } else {
      this.rating = String(this.cat.rating);
    }
  }
}
