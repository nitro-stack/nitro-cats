import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatsRoutingModule } from './cats-routing.module';
import { CatsListComponent } from './cats-list/cats-list.component';
import { SubmitCatComponent } from './submit-cat/submit-cat.component';

@NgModule({
  declarations: [CatsListComponent, SubmitCatComponent],
  imports: [CommonModule, CatsRoutingModule]
})
export class CatsModule {}
