import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Users } from '../../models/users';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './../auth/auth.service';
import { Roles } from '../../models/roles';

const apiUrl = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  userRoleStatus: string;
  userName: string;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

  getUsers(): Observable<Users[]> {
    const authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authToken
      })
    }

    this.authService.currentUserRole.subscribe(result => {this.userRoleStatus = result});
    this.authService.currentUserName.subscribe(result => {this.userName = result});

    let url = `${apiUrl}`;
    if(this.userRoleStatus !== Roles['admin']) {
      url = `${apiUrl}/?username=${this.userName}`;
    }

    return this.http.get<Users[]>(url, httpOptions)
      .pipe(
        tap(users => console.log('fetched Users')),
        catchError(this.handleError('getUsers', []))
      );
  }

  getUserById(id: string): Observable<Users> {
    const url = `${apiUrl}/${id}`;
    const authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authToken
      })
    };

    return this.http.get<Users>(url, httpOptions).pipe(
      tap(_ => console.log(`fetched users id=${id}`)),
      catchError(this.handleError<Users>(`getUsersById id=${id}`))
    );
  }

  addUser(users: Users): Observable<Users> {
    const authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authToken
      })
    };

    return this.http.post<Users>(apiUrl, users, httpOptions).pipe(
      tap((c: Users) => console.log(`added users w/ id=${c.id}`)),
      catchError(this.handleError<Users>('addUser'))
    );
  }

  updateUser(id: string, users: Users): Observable<any> {
    const url = `${apiUrl}/${id}`;
    const authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authToken
      })
    };

    return this.http.put(url, users, httpOptions).pipe(
      tap(_ => console.log(`updated users id=${id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser(id: string): Observable<Users> {
    const url = `${apiUrl}/${id}`;
    const authToken = this.authService.loadToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: authToken
      })
    };

    return this.http.delete<Users>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted users id=${id}`)),
      catchError(this.handleError<Users>('deleteUser'))
    );
  }
}
