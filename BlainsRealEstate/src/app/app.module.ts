import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { HomeComponentComponent } from './home-component/home-component.component';
import { NavBarComponentComponent } from './nav-bar-component/nav-bar-component.component';
import { SearchBarComponentComponent } from './search-bar-component/search-bar-component.component';
import { ContactformComponent } from './contactform/contactform.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    NavBarComponentComponent,
    SearchBarComponentComponent,
    ContactformComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
