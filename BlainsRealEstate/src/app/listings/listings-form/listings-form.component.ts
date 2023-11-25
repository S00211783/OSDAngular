import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-listing-form',
  templateUrl: './listings-form.component.html',
  styleUrls: ['./listings-form.component.css'],
})
export class ListingFormComponent implements OnInit {
  listingForm: FormGroup = new FormGroup({});

  message: string = '';

  @Input() listing?: Listing;

  constructor(private ListingService: ListingService, private router: Router) {}

  ngOnInit(): void {
    if (this.listing != null) {
      this.listingForm = new FormGroup({
        Cost: new FormControl(this.listing?.Cost, [Validators.required]),
        Address: new FormControl(this.listing?.Address, [Validators.required]),
        Bedrooms: new FormControl(this.listing?.Bedrooms, [Validators.required]),
        Description: new FormControl(this.listing?.Description, [Validators.required]),
        Type: new FormControl(this.listing?.Type, [Validators.required]),
        Location: new FormControl(this.listing?.Location, [Validators.required]),
        AgentId: new FormControl(this.listing?.AgentId, [Validators.required]),
      });
    }
  }

  addNewListing(newListing: Listing): void {
    console.log('adding new Listing ' + JSON.stringify(newListing));
    this.ListingService.postListing({ ...newListing }).subscribe({
      next: (Listing) => {
        this.router.navigateByUrl('/listings/' + Listing._id);
      },
      error: (err) => (this.message = err),
    });
  }

  updateListing(Listing: Listing): void {
    console.log('updating Listing' + JSON.stringify(this.listing));
    this.ListingService
      .updateListing(Listing._id, this.listingForm.value)
      .subscribe({
        next: (Listing) => {
          this.router.navigateByUrl('/listings');
        },
        error: (err) => (this.message = err),
      });
  }

  onSubmit() {
    if (this.listing != null) {
      console.log('form submitted with ');
      console.table(this.listingForm.value);
      this.updateListing(this.listing);
    } else {
      console.log('form submitted with ');
      console.table(this.listingForm.value);
      this.addNewListing(this.listingForm.value);
    }
  }
}
