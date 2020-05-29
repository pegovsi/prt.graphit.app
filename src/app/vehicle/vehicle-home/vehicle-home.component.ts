import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from "../../services/http-service.service";
import {Vehicle} from "../../models/Vehicle";
import {Observable} from 'rxjs';
import {SearchVehicleByNameCommand} from "../../models/SearchVehicleByNameCommand";

@Component({
  selector: 'app-vehicle-home',
  templateUrl: './vehicle-home.component.html',
  styleUrls: ['./vehicle-home.component.scss'],
  providers:[HttpServiceService]
})
export class VehicleHomeComponent implements OnInit {

  vehicles:Vehicle[];
  constructor(private httpClient: HttpServiceService) { }

  ngOnInit(): void {
    let command: SearchVehicleByNameCommand = {
      vehicleNameSearch:"МСТА"
    };
    this.httpClient.searchVehicles(command)
      .subscribe(data => this.vehicles = data);
  }

}
