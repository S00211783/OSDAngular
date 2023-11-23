import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingsComponent } from './listings/listings.component';
import { ListingdetailsComponent } from './listingdetails/listingdetails.component';



@NgModule({
  declarations: [
    ListingsComponent,
    ListingdetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ListingsModule { }
