import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IdentityCommand, IdentityResponse} from "../models/IdentityCommand";

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {}

  get token(): string {
    let token = localStorage.getItem('token')
    if (token === null) {
      this.logout()
      return null;
    }
    else{
      return token;
    }
  }

  login(user: IdentityCommand): Observable<any> {
    return this.http.post(`${environment.api}/api/v1/auth`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email нет')
        break
    }

    return throwError(error);
  }

  private setToken(response: IdentityResponse | null) {
    if (response) {
      localStorage.setItem('token', response.token);
    } else {
      localStorage.clear();
    }
  }
}
