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

  vehicleCondition:VehicleConditionDto;

  constructor(private httpClient: HttpServiceService) { }

  ngOnInit(): void {
    this.httpClient.getVehicleCondition()
      .subscribe(data => {
        this.vehicleCondition = data;
      });
  }

}
