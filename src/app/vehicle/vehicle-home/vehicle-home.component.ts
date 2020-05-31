import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from "../../services/http-service.service";
import {Vehicle} from "../../models/Vehicle";
import {Observable} from 'rxjs';
import {SearchVehicleByNameCommand} from "../../models/SearchVehicleByNameCommand";
import {AlertService} from "../../services/alert.service";
import {PageContext, VehiclePageFilter} from "../../models/pageContext";
import {VehiclesCollectionViewModel} from "../../models/vehiclesCollectionViewModel";

@Component({
  selector: 'app-vehicle-home',
  templateUrl: './vehicle-home.component.html',
  styleUrls: ['./vehicle-home.component.scss'],
  providers:[HttpServiceService]
})
export class VehicleHomeComponent implements OnInit {

  vehicles: Vehicle[];
  totalCount: number;
  totalPages: Array<number>;
  currentPage:number;

  constructor(
    private httpClient: HttpServiceService,
    private alertService: AlertService) { }

  ngOnInit(): void {

    this.getData(1, 12);
  }

  getData(pageIndex:number, pageSize:number){
    let command: PageContext<VehiclePageFilter> = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: {
        VehicleName: null,
        City: null,
        Condition:null,
        Division: null,
        Garrison: null,
        Subdivision: null,
        VehicleId: null
      },
      listSort: null
    };

    this.httpClient.getVehiclesPage(command)
      .subscribe(data => {
        this.vehicles = data.data;
        this.totalCount = data.totalCount;

        this.setPages(data.totalCount);

        this.alertService.success('Title', 'Данные обновились','' );
      });
  }
  setPages(totalCount:number){
    let count: number;

    if(totalCount > 10){
      count = 10;
    }else {
      count = totalCount;
    }

    this.totalPages = new Array<number>(count);
    for (let i=0; i<=count; i++){
      this.totalPages[i] = (i+1);
    }
  }

  onCurrentPage(event){
    this.currentPage = event;
    this.getData(event, 12);
  }

}
