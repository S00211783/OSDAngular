import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListingsDetailsComponent } from './listings-details/listings-details.component';
import { ListingFormComponent } from './listings-form/listings-form.component';
import { ListingsListComponent } from './listings-list/listings-list.component';

const routes: Routes = [
  { path: 'listings', component: ListingsListComponent},
  {path: 'listings/details', component: ListingsDetailsComponent},
  {path: 'listings/form', component: ListingFormComponent},
  {path: 'listings/:id', component: ListingsDetailsComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
