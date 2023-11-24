import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingsFormComponent } from './listings-form/listings-form.component';
import { ListingsListComponent } from './listings-list/listings-list.component';
import { ListingsDetailsComponent } from './listings-details/listings-details.component';



@NgModule({
  declarations: [
    ListingsFormComponent,
    ListingsListComponent,
    ListingsDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ListingsModule { }
