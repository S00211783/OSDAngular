import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Listing } from './listing';

@Injectable({
  providedIn: 'root',
})
export class ListingService {

  private dataUri = `${environment.apiUri}/listings`;

  constructor(private http: HttpClient) {}

  getListings(): Observable<Listing[]> {
    console.log('get Listings called');

    const headers = new HttpHeaders().set('X-API-key', 'matthewblain');
    console.log(headers);
    return this.http
      .get<Listing[]>(this.dataUri, {headers})
      .pipe(retry(3), catchError(this.handleError));
  }
  getListingsWithQuery(country: string, type: string): Observable<Listing[]> {
    console.log('get Listings called');

    const headers = new HttpHeaders().set('X-API-key', 'matthewblain');
    console.log(headers);
    const params = {
      location: country,
      type: type
    };

    return this.http
      .get<Listing[]>(this.dataUri, { headers, params })
      .pipe(retry(3), catchError(this.handleError));
  }
  getListingById(id: string): Observable<Listing> {
    return this.http
      .get<Listing>(`${this.dataUri}/${id}`)
      .pipe(retry(3), catchError(this.handleError));
  }
  postListing(listing: Listing): Observable<Listing> {
    const headers = new HttpHeaders().set('X-API-key', 'matthewblain');
    return this.http.post<Listing>(this.dataUri, listing, { headers })
      .pipe(catchError(this.handleError));
  }
  deleteListing(id: string): Observable<Listing> {
    const headers = new HttpHeaders().set('X-API-key', 'matthewblain');
    return this.http
      .delete<Listing>(`${this.dataUri}/${id}`, { headers })
      .pipe(retry(3), catchError(this.handleError));
  }
  updateListing(id: string, listing: Listing): Observable<Listing> {
    console.log('subscribing to update/' + id);
    let listingURI: string = this.dataUri + '/' + id;
    return this.http.put<Listing>(listingURI, listing)
      .pipe(
        catchError(this.handleError)
      );
  }
  getTopFiveListings(): Observable<Listing[]> {
    return this.http
      .get<Listing[]>(`${this.dataUri}/top`)
      .pipe(
        retry(3), // Retry the request up to 3 times in case of failure
        catchError(this.handleError) // Handle errors
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}