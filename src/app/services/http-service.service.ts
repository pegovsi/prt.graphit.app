import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vehicle} from "../models/Vehicle";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {SearchVehicleByNameCommand} from "../models/SearchVehicleByNameCommand";
import {PageContext, VehiclePageFilter} from "../models/pageContext";
import {VehiclesCollectionViewModel} from "../models/vehiclesCollectionViewModel";

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
    return this.client.get<Vehicle[]>('http://10.10.11.35:8080/api/v1/vehicles/24d369ee-22a8-4b17-9277-27d9f115690d')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
//http://10.10.11.35:8080/api/v1/vehicles/search

  searchVehicles(command: SearchVehicleByNameCommand): Observable<Vehicle[]> {
    return this.client.post<Vehicle[]>(
      'http://localhost:5000/api/v1/vehicles/search',
      JSON.stringify(command),
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  getVehicleById(vehicleId:string): Observable<Vehicle> {
    return this.client.get<Vehicle>(
      `http://localhost:5000/api/v1/vehicles/${vehicleId}`,
      this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getVehiclesPage(command: PageContext<VehiclePageFilter>): Observable<VehiclesCollectionViewModel<Vehicle[]>> {
    return this.client.post<VehiclesCollectionViewModel<Vehicle[]>>(
      'http://localhost:5000/api/v1/vehicles/page',
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
