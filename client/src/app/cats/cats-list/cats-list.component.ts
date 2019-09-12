import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Cat } from '../cat';
import { CatsService } from '../cats.service';

@Component({
  selector: 'nc-cats-list',
  templateUrl: './cats-list.component.html',
  styleUrls: ['./cats-list.component.scss']
})
export class CatsListComponent implements OnInit {
  cats$: Observable<Cat[]> | null;

  constructor(private activatedRoute: ActivatedRoute, private catsService: CatsService) {}

  ngOnInit() {
    const orderBy = this.activatedRoute.snapshot.data && this.activatedRoute.snapshot.data.orderBy || 'latest';
    this.cats$ = this.catsService.getCats(orderBy);
  }
}
