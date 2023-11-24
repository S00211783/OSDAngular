import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-listings-list',
  templateUrl: './listings-list.component.html',
  styleUrls: ['./listings-list.component.css']
})
export class ListingsListComponent implements OnInit {
listing$: Observable<Listing[]> | undefined;
message:string = "";
  constructor(private listingService : ListingService) {
    this.listing$ = this.listingService.getListings();
   }

  ngOnInit(): void {
  }

}
