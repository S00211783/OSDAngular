import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listings/listing.service';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { Listing } from '../listings/listing';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message: any;
  location: string = '';
  selectedType: string = '';
  top5Listings: any;
  constructor(private listingService: ListingService, private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    this.loadTopListings();
  }

  loadTopListings(): void {
    this.listingService.getTopFiveListings().subscribe(
      listings => {
        this.top5Listings = listings; // Assign the result to the property
      },
      error => {
        console.error('Error fetching top listings:', error);
      }
    );
  }

  public search() {
    console.log('Location:', this.location);
    console.log('Property Type:', this.selectedType);

    // Check if either location or selectedType is provided
    if (this.location || this.selectedType) {
      // Use navigateByUrl with queryParams to pass parameters
      this.router.navigateByUrl(`/listings-list?location=${this.location}&type=${this.selectedType}`);
    } else {
      this.router.navigateByUrl('/listings');
    }
  }
}