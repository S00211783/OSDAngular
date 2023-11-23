import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponentComponent } from './home-component/home-component.component';
import { ListingsComponent } from './listings/listings/listings.component';
import { ListingdetailsComponent } from './listings/listingdetails/listingdetails.component';

const routes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'properties', component: ListingsComponent },
  { path: 'property/:id', component: ListingdetailsComponent },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
