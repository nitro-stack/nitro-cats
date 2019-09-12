import { Component, OnInit, Input } from '@angular/core';

import { Cat } from '../cat';

@Component({
  selector: 'nc-cat-item',
  templateUrl: './cat-item.component.html',
  styleUrls: ['./cat-item.component.scss']
})
export class CatItemComponent implements OnInit {
  @Input() cat: Cat;

  constructor() { }

  ngOnInit() {
  }

}
