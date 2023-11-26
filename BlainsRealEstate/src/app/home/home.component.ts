import { Component, OnInit } from '@angular/core';
import { ListingService } from '../listings/listing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message: any;
  location: string = '';
  selectedType: string = '';

  constructor(private listingService: ListingService, private router: Router) {}

  ngOnInit(): void {}

  public search() {
    console.log('Location:', this.location);
    console.log('Property Type:', this.selectedType);
    
    // Check if either location or selectedType is provided
    if (this.location || this.selectedType) {
      // Use navigateByUrl with queryParams to pass parameters
      this.router.navigateByUrl(`/listings-list?location=${this.location}&type=${this.selectedType}`);
    }
    else{
      this.router.navigateByUrl('/listings');
    }
  }
}
