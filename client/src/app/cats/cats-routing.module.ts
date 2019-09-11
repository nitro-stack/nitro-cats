import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatsListComponent } from './cats-list/cats-list.component';
import { SubmitCatComponent } from './submit-cat/submit-cat.component';

const routes: Routes = [
  { path: '', redirectTo: '/latest', pathMatch: 'full' },
  { path: 'latest', component: CatsListComponent },
  { path: 'top', component: CatsListComponent, data: { orderBy: 'rating' } },
  { path: 'submit', component: SubmitCatComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatsRoutingModule {}
