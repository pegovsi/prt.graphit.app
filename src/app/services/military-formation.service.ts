import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {MilitaryFormationPageFilter, PageContext, UserPageFilter, VehicleModelPageFilter} from "../models/pageContext";
import {CollectionViewModel, UsersCollectionViewModel} from "../models/vehiclesCollectionViewModel";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {catchError, retry} from "rxjs/operators";
import {VehicleModelDto} from "../models/vehicleModelDto";
import {MilitaryFormationDto} from "../models/militaryFormationDto";
import {LevelManagement} from "../models/crewDto";

@Injectable({providedIn: 'root'})
export class MilitaryFormationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public error$: Subject<string> = new Subject<string>()

  constructor(private client: HttpClient) {
  }

  getDataPage(command: PageContext<MilitaryFormationPageFilter>):Observable<CollectionViewModel<MilitaryFormationDto[]>>{
    return this.client.post<CollectionViewModel<MilitaryFormationDto[]>>(
      `${environment.api}/api/v1/military-formation/page`,
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
