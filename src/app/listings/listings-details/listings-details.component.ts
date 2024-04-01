import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Listing } from '../listing';
import { ListingService } from '../listing.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listings-details.component.html',
  styleUrls: ['./listings-details.component.css'],
})
export class ListingDetailsComponent implements OnInit {
  id: any;
  listing: any;
  message: string = '';
  showForm: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private listingService: ListingService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public auth:AuthService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.listingService.getListingById(this.id).subscribe({
        next: (value: Listing) => (this.listing = value),
        complete: () => console.log('listing service finished'),
        error: (message) => (this.message = message),
      });
    }
  }
  editListing() {
    this.showForm = true;
  }

  deleteItem() {
    this.listingService.deleteListing(this.listing?._id).subscribe({
      next: (listing) => {
        console.log(JSON.stringify(listing) + ' has been deleted');
        this.message = 'listing has been deleted';
        this.router.navigateByUrl('/listings');
      },
      error: (message) => {
        this.openErrorSnackBar(message);
      },
    });
  }

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, 'Dismiss', {
      duration: 15000, // Set the duration for how long the snackbar should be visible (in milliseconds)
      panelClass: ['error-snackbar'], // You can define custom styles for the snackbar
    });
  }
}
