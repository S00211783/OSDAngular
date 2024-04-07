import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private cookieService: CookieService) {}

  getUserData(): Observable<any> {
    const userDataJson = this.cookieService.get('userData');
    if (userDataJson) {
      return of(JSON.parse(userDataJson));
    } else {
      // If no user data found in cookies, return an empty object
      return of({});
    }
  }

  updateUserData(userData: any): void {
    const userDataJson = JSON.stringify(userData);
    this.cookieService.set('userData', userDataJson);
  }

  addSavedQuote(quote: any): Observable<any> {
    return this.getUserData().pipe(
      map(userData => {
        if (!userData.savedQuotes) {
          userData.savedQuotes = [];
        }
        userData.savedQuotes.push(quote);
        this.updateUserData(userData);
        return userData;
      }),
      catchError(this.handleError<any>('addSavedQuote'))
    );
  }

  removeSavedQuote(index: number): Observable<any> {
    return this.getUserData().pipe(
      map(userData => {
        if (userData.savedQuotes) {
          userData.savedQuotes.splice(index, 1);
          this.updateUserData(userData);
        }
        return userData;
      }),
      catchError(this.handleError<any>('removeSavedQuote'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}