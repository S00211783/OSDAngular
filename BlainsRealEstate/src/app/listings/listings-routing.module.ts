import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingDetailsComponent } from './listings-details/listings-details.component';
import { ListingFormComponent } from './listings-form/listings-form.component';
import { ListingsListComponent } from './listings-list/listings-list.component';

const routes: Routes = [
  { path: 'listings', component: ListingsListComponent},
  {path: 'listings/details', component: ListingDetailsComponent},
  {path: 'listings/form', component: ListingFormComponent},
  {path: 'listings/:id', component: ListingDetailsComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListingsRoutingModule { }
