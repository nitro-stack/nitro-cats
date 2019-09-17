import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { filter } from 'rxjs/operators';

import { AdminService } from './admin.service';

@Component({
  selector: 'nc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav', { static: false }) sidenav!: MatSidenav;

  constructor(
    private media: MediaObserver,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    // Automatically close side menu on screens > sm breakpoint
    this.media
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) =>
          changes.some(
            change => change.mqAlias !== 'xs' && change.mqAlias !== 'sm'
          )
        )
      )
      .subscribe(() => this.sidenav.close());
  }

  enableAdminMode() {
    this.adminService.enableAdminMode();
  }
}
