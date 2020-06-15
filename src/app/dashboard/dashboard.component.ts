import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from "../services/http-service.service";
import {VehicleConditionDto} from "../models/vehicleConditionDto";
import {VehiclesCountByCityDto} from "../models/VehiclesCountByCityDto";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  vehicleCondition:VehicleConditionDto = {
    vehicleTotal:0,
    approved:0,
    readiness:0,
    vehicleActive: 0,
    vehicleDisactive: 0
  };

  constructor(private httpClient: HttpServiceService) { }

  ngOnInit(): void {
    this.httpClient.getVehicleCondition()
      .subscribe(data => {
        this.vehicleCondition = data;
      });
  }

}
