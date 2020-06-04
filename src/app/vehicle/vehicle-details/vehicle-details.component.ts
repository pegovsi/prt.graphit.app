import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {HttpServiceService} from "../../services/http-service.service";
import {Vehicle} from "../../models/Vehicle";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  @Input() vehicleId: string;
  vehicle$: Observable<Vehicle>;
  myColor:string = '#ffc000';

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpServiceService) { }

  ngOnInit(): void {
    this.vehicle$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.httpClient.getVehicleById(params['id']);
      }));


     //this.vehicle$ = this.httpClient.getVehicleById(this.vehicleId);
  }

}
