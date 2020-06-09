import { Component, OnInit } from '@angular/core';
import {Vehicle} from "../models/Vehicle";
import {HttpServiceService} from "../services/http-service.service";
import {AlertService} from "../services/alert.service";
import {PageContext, VehiclePageFilter} from "../models/pageContext";
import {SplitService} from "../services/split.service";

@Component({
  selector: 'app-map-vehicles',
  templateUrl: './map-vehicles.component.html',
  styleUrls: ['./map-vehicles.component.scss']
})
export class MapVehiclesComponent implements OnInit {

  vehicles: Vehicle[];
  totalCount: number;
  totalPages: Array<number>;
  currentPage:number;

  constructor(
    private httpClient: HttpServiceService,
    private alertService: AlertService,
    private splitService: SplitService) { }

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

  //отлавливает изменения размера сплита
  transitionEnd(){
    this.splitService.updateMap();
  }
}
