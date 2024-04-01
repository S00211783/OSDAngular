import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserDataService } from '../user-data.service'; // Import UserDataService
import { Observable } from 'rxjs';
import { Listing } from '../listings/listing';
import { ListingService } from '../listings/listing.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  totalListings: number = 0;
  totalPropertyCosts: number = 0;
  listings$: Observable<Listing[]> | undefined;
  savedQuotes: any[] = []; // Array to store saved quotes

  constructor(public auth: AuthService, private userDataService: UserDataService, private listingService : ListingService) {}

  ngOnInit(): void {
    this.listings$ = this.listingService.getListings();
    this.listings$!.subscribe(listings => {
      this.totalListings = listings.length;
      this.totalPropertyCosts = 0; // Reset the total property costs
      listings.forEach(listing => {
        this.totalPropertyCosts += listing.Cost.valueOf(); // Convert to primitive number
      });
    });

    // Fetch saved quotes
    this.userDataService.getUserData().subscribe(userData => {
      if (userData && userData.savedQuotes) {
        this.savedQuotes = userData.savedQuotes;
      }
    });
  }
  deleteQuote(index: number): void {
    // Remove the quote at the specified index from savedQuotes array
    this.savedQuotes.splice(index, 1);
    // Update user data to reflect the changes
    this.userDataService.updateUserData({ savedQuotes: this.savedQuotes });
  }
}
