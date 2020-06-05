import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {IdentityCommand, IdentityResponse} from "../models/IdentityCommand";
import {UsersCollectionViewModel, VehiclesCollectionViewModel} from "../models/vehiclesCollectionViewModel";
import {User} from "../models/user";
import {Vehicle} from "../models/Vehicle";
import {PageContext, UserPageFilter, VehiclePageFilter} from "../models/pageContext";
import {HttpServiceService} from "./http-service.service";

@Injectable({providedIn: 'root'})
export class UsersService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public error$: Subject<string> = new Subject<string>()

  constructor(private client: HttpClient) {}

  getUsersPage(command: PageContext<UserPageFilter>):Observable<UsersCollectionViewModel<User[]>>{
    return this.client.post<UsersCollectionViewModel<User[]>>(
      `${environment.api}/api/v1/users/page`,
      JSON.stringify(command),
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }




  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
