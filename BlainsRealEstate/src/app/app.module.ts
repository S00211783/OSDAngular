import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS,HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';
import { HomeComponent } from './home/home.component';
import { ListingsModule } from './listings/listings.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatSelectModule,
    ListingsModule,
    FormsModule,
    AuthModule.forRoot({...environment.auth0,
      httpInterceptor: {
        allowedList: [
          {
            uri:  `${environment.apiUri}/listings/*`,
            httpMethod: 'PUT',
          },
          {
            uri:  `${environment.apiUri}/listings`,
            httpMethod: 'POST',
          },
          {
            uri:  `${environment.apiUri}/listings/*`,
            httpMethod: 'DELETE',
          },
         ]}
      })
    ],
  
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  },],

  bootstrap: [AppComponent]
})
export class AppModule { }
