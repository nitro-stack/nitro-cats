import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { FileUploadModule } from 'ng2-file-upload';

import { MaterialModule } from '@app/material.module';
import { CatsRoutingModule } from './cats-routing.module';
import { CatsListComponent } from './cats-list/cats-list.component';
import { SubmitCatComponent } from './submit-cat/submit-cat.component';
import { CatItemComponent } from './cat-item/cat-item.component';

@NgModule({
  declarations: [CatsListComponent, SubmitCatComponent, CatItemComponent],
  imports: [CommonModule, CatsRoutingModule, NgMasonryGridModule, FileUploadModule, MaterialModule]
})
export class CatsModule {}
