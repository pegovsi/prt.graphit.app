import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {PageContext, UserPageFilter, VehicleModelPageFilter} from "../models/pageContext";
import {CollectionViewModel, UsersCollectionViewModel} from "../models/vehiclesCollectionViewModel";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {catchError, retry} from "rxjs/operators";
import {VehicleModelDto, VehicleModelPositionDto} from "../models/vehicleModelDto";

@Injectable({providedIn: 'root'})
export class VehicleModelService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public error$: Subject<string> = new Subject<string>()

  constructor(private client: HttpClient) {
  }

  getModelsPage(command: PageContext<VehicleModelPageFilter>):Observable<CollectionViewModel<VehicleModelDto[]>>{
    return this.client.post<UsersCollectionViewModel<VehicleModelDto[]>>(
      `${environment.api}/api/v1/vehicle-model/page`,
      JSON.stringify(command),
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getAllModels():Observable<VehicleModelDto[]>{
    return this.client.get<VehicleModelDto[]>(
      `${environment.api}/api/v1/vehicle-model`,
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //model-positions/id
  getModelPositions(id:string):Observable<VehicleModelPositionDto[]>{
    return this.client.get<VehicleModelPositionDto[]>(
      `${environment.api}/api/v1/vehicle-model/positions/${id}`,
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
