import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  country: string = '';
  selectedType: string = '';

  search() {
    // Implement your search logic based on 'country' and 'selectedType'
    console.log('Country:', this.country);
    console.log('Property Type:', this.selectedType);
    // Add logic to perform the search based on user input
  }
  createListing(){

  }

}
