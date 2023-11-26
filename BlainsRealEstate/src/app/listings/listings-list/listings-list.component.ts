import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listings-list',
  templateUrl: './listings-list.component.html',
  styleUrls: ['./listings-list.component.css']
})
export class ListingsListComponent implements OnInit {
  listings$: Observable<Listing[]> | undefined;
  message: string = "";

  constructor(private listingService: ListingService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const location = params['location'];
      const type = params['type'];

      if (location || type) {
        this.listings$ = this.listingService.getListingsWithQuery(location, type);
      } else {
        this.listings$ = this.listingService.getListings();
      }
    });
  }
}
