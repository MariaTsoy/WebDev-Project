import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { AuthToken, User } from './models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userUrl = 'http://127.0.0.1:8000/api/users';
  baseUrl = 'http://127.0.0.1:8000';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  getUser(id: number): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url).pipe(catchError(this.handleError));
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.userUrl}/${user.id}`;
    return this.http
      .put<User>(url, user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  login(username: string, password: string): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(`${this.baseUrl}/api/login/`, {
        username,
        password,
      })
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            // Handle 401 unauthorized error
            return throwError(
              () => new Error('Unauthorized: Incorrect username or password.')
            );
          }
          return this.handleError(error);
        })
      );
  }
}
