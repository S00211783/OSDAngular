import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';

@Component({
  selector: 'app-Listing-form',
  templateUrl: './Listing-form.component.html',
  styleUrls: ['./Listing-form.component.css'],
})
export class ListingFormComponent implements OnInit {
  ListingForm: FormGroup = new FormGroup({
    Cost: new FormControl('', [Validators.required]),
    Address: new FormControl('', [Validators.required]),
    Bedrooms: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
    Type: new FormControl('', [Validators.required]),
    Location: new FormControl('', [Validators.required]),
    AgentId: new FormControl('', [Validators.required]),
  });

  message: string = '';

  @Input() Listing?: Listing;

  constructor(private ListingService: ListingService, private router: Router) {}

  ngOnInit(): void {
    if (this.Listing != null) {
      this.ListingForm = new FormGroup({
        Cost: new FormControl(this.Listing?.Cost, [Validators.required]),
        Address: new FormControl(this.Listing?.Address, [Validators.required]),
        Bedrooms: new FormControl(this.Listing?.Bedrooms, [Validators.required]),
        Description: new FormControl(this.Listing?.Description, [Validators.required]),
        Type: new FormControl(this.Listing?.Type, [Validators.required]),
        Location: new FormControl(this.Listing?.Location, [Validators.required]),
        AgentId: new FormControl(this.Listing?.AgentId, [Validators.required]),
      });
    }
  }

  addNewListing(newListing: Listing): void {
    console.log('adding new Listing ' + JSON.stringify(newListing));
    this.ListingService.postListing({ ...newListing }).subscribe({
      next: (Listing) => {
        this.router.navigateByUrl('/Listings/' + Listing._id);
      },
      error: (err) => (this.message = err),
    });
  }

  updateListing(Listing: Listing): void {
    console.log('updating Listing' + JSON.stringify(this.Listing));
    this.ListingService
      .updateListing(Listing._id, this.ListingForm.value)
      .subscribe({
        next: (Listing) => {
          this.router.navigateByUrl('/Listings');
        },
        error: (err) => (this.message = err),
      });
  }

  onSubmit() {
    if (this.Listing != null) {
      console.log('form submitted with ');
      console.table(this.ListingForm.value);
      this.updateListing(this.Listing);
    } else {
      console.log('form submitted with ');
      console.table(this.ListingForm.value);
      this.addNewListing(this.ListingForm.value);
    }
  }
}
