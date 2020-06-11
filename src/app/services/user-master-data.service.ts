import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {PageContext, UserMasterDataFilter, UserPageFilter, VehicleModelPageFilter} from "../models/pageContext";
import {CollectionViewModel } from "../models/vehiclesCollectionViewModel";
import {environment} from "../../environments/environment";
import {catchError, retry} from "rxjs/operators";
import {CreateUserMasterDataCommand, TypeUserMasterDataDto, UserMasterDataDto} from "../models/userMasterDataDto";
import {Result} from "../models/Result";

@Injectable({providedIn: 'root'})
export class UserMasterDataService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public error$: Subject<string> = new Subject<string>()

  constructor(private client: HttpClient) {
  }

  getModelsPage(command: PageContext<UserMasterDataFilter>):Observable<CollectionViewModel<UserMasterDataDto[]>>{
    return this.client.post<CollectionViewModel<UserMasterDataDto[]>>(
      `${environment.api}/api/v1/user-master-data/page`,
      JSON.stringify(command),
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getTypesUserMasterData():Observable<TypeUserMasterDataDto[]>{
    return this.client.get<TypeUserMasterDataDto[]>(
      `${environment.api}/api/v1/user-master-data/types`,
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  create(command: CreateUserMasterDataCommand):Observable<Result<string>>{
    return this.client.post<Result<string>>(
      `${environment.api}/api/v1/user-master-data`,
      JSON.stringify(command),
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getUserMasterDataById(id:string):Observable<UserMasterDataDto>{
    return this.client.get<UserMasterDataDto>(
      `${environment.api}/api/v1/user-master-data/${id}`,
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
