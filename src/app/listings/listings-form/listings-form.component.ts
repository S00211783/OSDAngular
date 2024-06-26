import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-listing-form',
  templateUrl: './listings-form.component.html',
  styleUrls: ['./listings-form.component.css'],
})
export class ListingFormComponent implements OnInit {
  listingForm: UntypedFormGroup = new UntypedFormGroup({
    Cost: new UntypedFormControl(this.listing?.Cost, [Validators.required]),
    Address: new UntypedFormControl(this.listing?.Address, [Validators.required]),
    Bedrooms: new UntypedFormControl(this.listing?.Bedrooms, [Validators.required]),
    Description: new UntypedFormControl(this.listing?.Description, [Validators.required]),
    Type: new UntypedFormControl(this.listing?.Type, [Validators.required]),
    Location: new UntypedFormControl(this.listing?.Location, [Validators.required]),
    AgentId: new UntypedFormControl(this.listing?.AgentId, [Validators.required]),
  });

  message: string = '';

  @Input() listing?: Listing;

  constructor(private ListingService: ListingService, private router: Router, public auth:AuthService) {}

  ngOnInit(): void {
    if (this.listing != null) {
      this.listingForm = new UntypedFormGroup({
        Cost: new UntypedFormControl(this.listing?.Cost, [Validators.required]),
        Address: new UntypedFormControl(this.listing?.Address, [Validators.required]),
        Bedrooms: new UntypedFormControl(this.listing?.Bedrooms, [Validators.required]),
        Description: new UntypedFormControl(this.listing?.Description, [Validators.required]),
        Type: new UntypedFormControl(this.listing?.Type, [Validators.required]),
        Location: new UntypedFormControl(this.listing?.Location, [Validators.required]),
        AgentId: new UntypedFormControl(this.listing?.AgentId, [Validators.required]),
      });
    }
  }

  addNewListing(newListing: Listing): void {
    console.log('adding new Listing ' + JSON.stringify(newListing));
    this.ListingService.postListing({ ... newListing }).subscribe({
      next: (Listing) => {
        this.router.navigateByUrl('/listings/' + Listing._id);
      },
      error: (err) => (this.message = err),
    });
  }

  updateListing(listing: Listing): void {
    console.log('updating Listing' + JSON.stringify(this.listing));
    this.ListingService
      .updateListing(listing._id, this.listingForm.value)
      .subscribe({
        next: (updatedListing) => {
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
