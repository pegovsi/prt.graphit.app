import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vehicle} from "../models/Vehicle";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {SearchVehicleByNameCommand} from "../models/SearchVehicleByNameCommand";
import {PageContext, VehiclePageFilter} from "../models/pageContext";
import {environment} from "../../environments/environment";
import {CollectionViewModel} from "../models/vehiclesCollectionViewModel";
import {VehicleConditionDto} from "../models/vehicleConditionDto";
import {VehiclesCountByCityDto} from "../models/VehiclesCountByCityDto";
import {UpdateVehicleCommand} from "../models/UpdateVehicleCommand";
import {CreateUserMasterDataCommand} from "../models/userMasterDataDto";
import {Result} from "../models/Result";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private client: HttpClient) { }
// Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.client.get<Vehicle[]>(`${environment.api}/api/v1/vehicles`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  searchVehicles(command: SearchVehicleByNameCommand): Observable<Vehicle[]> {
    return this.client.post<Vehicle[]>(
      `${environment.api}/api/v1/vehicles/search`,
      JSON.stringify(command),
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  getVehicleById(vehicleId:string): Observable<Vehicle> {
    return this.client.get<Vehicle>(
      `${environment.api}/api/v1/vehicles/${vehicleId}`,
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getVehiclesPage(command: PageContext<VehiclePageFilter>): Observable<CollectionViewModel<Vehicle[]>> {
    return this.client.post<CollectionViewModel<Vehicle[]>>(
      `${environment.api}/api/v1/vehicles/page`,
      JSON.stringify(command),
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getVehicleCondition(): Observable<VehicleConditionDto> {
    return this.client.get<VehicleConditionDto>(
      `${environment.api}/api/v1/vehicles/condition`,
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  getVehicleByCityReport(): Observable<VehiclesCountByCityDto> {
    return this.client.get<VehiclesCountByCityDto>(
      `${environment.api}/api/v1/vehicles/report-by-city`,
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  updateVehicle(command: UpdateVehicleCommand):Observable<Result<string>>{
      return this.client.put<Result<string>>(
        `${environment.api}/api/v1/vehicles`,
        JSON.stringify(command),
        this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
  }

  // Error handling
  handleError(error) {
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
