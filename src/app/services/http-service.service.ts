import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vehicle} from "../models/Vehicle";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {SearchVehicleByNameCommand} from "../models/SearchVehicleByNameCommand";
import {PageContext, VehiclePageFilter} from "../models/pageContext";
import {VehiclesCollectionViewModel} from "../models/vehiclesCollectionViewModel";
import {environment} from "../../environments/environment";

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

  getVehiclesPage(command: PageContext<VehiclePageFilter>): Observable<VehiclesCollectionViewModel<Vehicle[]>> {
    return this.client.post<VehiclesCollectionViewModel<Vehicle[]>>(
      `${environment.api}/api/v1/vehicles/page`,
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
