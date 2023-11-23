import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar-component',
  templateUrl: './search-bar-component.component.html',
  styleUrls: ['./search-bar-component.component.css']
})
export class SearchBarComponentComponent implements OnInit {

  maxPrice : any
  minPrice : any


  constructor() { }

  ngOnInit(): void {
  }
  applyFilters(){

  }
  search(){

  }
}
