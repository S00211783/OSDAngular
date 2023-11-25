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
  getListingById(id: string): Observable<Listing> {
    return this.http
      .get<Listing>(`${this.dataUri}/${id}`)
      .pipe(retry(3), catchError(this.handleError));
  }
  postListing(Listing: Listing): Observable<Listing> {
    return this.http
      .post<Listing>(`${this.dataUri}`, Listing)
      .pipe(retry(3), catchError(this.handleError));
  }
  deleteListing(id: string): Observable<Listing> {
    return this.http
      .delete<Listing>(`${this.dataUri}/${id}`)
      .pipe(retry(3), catchError(this.handleError));
  }
  updateListing(id: string, Listing: Listing): Observable<Listing> {
    console.log('subscribing to update/' + id);
    let ListingURI: string = this.dataUri + '/' + id;
    return this.http.put<Listing>(ListingURI, Listing)
    .pipe(
    catchError(this.handleError)
    )
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
