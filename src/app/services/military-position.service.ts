import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {
  MilitaryFormationPageFilter,
  MilitaryPositionPageFilter,
  PageContext,
  UserPageFilter,
  VehicleModelPageFilter
} from "../models/pageContext";
import {CollectionViewModel, UsersCollectionViewModel} from "../models/vehiclesCollectionViewModel";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {catchError, retry} from "rxjs/operators";
import {VehicleModelDto} from "../models/vehicleModelDto";
import {MilitaryFormationDto} from "../models/militaryFormationDto";
import {LevelManagement, MilitaryPosition} from "../models/crewDto";

@Injectable({providedIn: 'root'})
export class MilitaryPositionService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public error$: Subject<string> = new Subject<string>()

  constructor(private client: HttpClient) {
  }

  getDataPage(command: PageContext<MilitaryPositionPageFilter>):Observable<CollectionViewModel<MilitaryPosition[]>>{
    return this.client.post<CollectionViewModel<MilitaryPosition[]>>(
      `${environment.api}/api/v1/military-position/page`,
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
