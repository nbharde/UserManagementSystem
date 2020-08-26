import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: string;
  private UserName    = new BehaviorSubject<string>(localStorage.getItem('username'));
  private UserRole    = new BehaviorSubject<string>(localStorage.getItem('userRole'));

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  authenticateUser(user): Observable<any> {
    return this.http.post('http://localhost:3000/auth/login', user, httpOptions).pipe(
      tap((c) => console.log(`authenticated users w/ id=${c}`)),
      catchError(this.handleError('authenticateUser', []))
    );
  }

  storeUserData(token, user, userRole): void {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', user);
    localStorage.setItem('userRole', userRole);
    this.UserName.next(localStorage.getItem('user'));
    this.UserRole.next(localStorage.getItem('userRole'));

    this.authToken = token;
  }

  loadToken(): string {
    return localStorage.getItem('id_token');
  }

  loggedIn(): boolean {
    return this.loadToken() !== null;
  }

  get currentUserName() 
  {
    return this.UserName.asObservable();
  }

  get currentUserRole() 
  {
    return this.UserRole.asObservable();
  }

}
