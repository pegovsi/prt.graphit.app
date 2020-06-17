//CrewDto
import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {CrewPageFilter, PageContext, UserPageFilter, VehicleModelPageFilter} from "../models/pageContext";
import {CollectionViewModel, UsersCollectionViewModel} from "../models/vehiclesCollectionViewModel";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {catchError, retry} from "rxjs/operators";
import {VehicleModelDto} from "../models/vehicleModelDto";
import {AddCrewCommand, CrewDto} from "../models/crewDto";
import {Result} from "../models/Result";

@Injectable({providedIn: 'root'})
export class CrewService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public error$: Subject<string> = new Subject<string>()

  constructor(private client: HttpClient) {
  }

  getCrewsPage(command: PageContext<CrewPageFilter>):Observable<CollectionViewModel<CrewDto[]>>{
    return this.client.post<UsersCollectionViewModel<CrewDto[]>>(
      `${environment.api}/api/v1/crew/page`,
      JSON.stringify(command),
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  AddCrew(command: AddCrewCommand): Observable<Result<string>>{
    return this.client.post<Result<string>>(
      `${environment.api}/api/v1/crew`,
      JSON.stringify(command),
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getCrewByVehicle(id:string):Observable<CrewDto[]>{
    return this.client.get<CrewDto[]>(
      `${environment.api}/api/v1/crew/vehicle/${id}`,
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
