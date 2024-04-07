import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingFormComponent } from './listings-form/listings-form.component';
import { ListingsListComponent } from './listings-list/listings-list.component';
import { ListingDetailsComponent} from './listings-details/listings-details.component';
import{ListingsRoutingModule} from './listings-routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ListingFormComponent,
    ListingsListComponent,
    ListingDetailsComponent
  ],
  imports: [
    CommonModule,
    ListingsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule

  ],
  exports:[
    ListingsListComponent,
    ListingFormComponent,
    ListingDetailsComponent
  ]
})
export class ListingsModule { }
