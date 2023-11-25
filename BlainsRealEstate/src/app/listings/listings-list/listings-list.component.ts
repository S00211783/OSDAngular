import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-listings-list',
  templateUrl: './listings-list.component.html',
  styleUrls: ['./listings-list.component.css']
})
export class ListingsListComponent {
listings$: Observable<Listing[]> | undefined;
message:string = "";
  constructor(private listingService : ListingService) {
    this.listings$ = this.listingService.getListings();
   }


}
