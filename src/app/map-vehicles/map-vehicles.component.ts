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
  isLoaded:boolean = true;
  vehicles: Vehicle[];
  totalCount: number;
  pages: Array<number>;
  totalPages:number = 0;
  pageSize:number = 6;
  currentPage:number  = 1;
  currentMinRange:number = 1;
  currentMaxRange:number = 10;

  constructor(
    private httpClient: HttpServiceService,
    private alertService: AlertService,
    private splitService: SplitService) { }

  ngOnInit(): void {
    this.isLoaded = false;
    this.getData(1, this.pageSize);
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
        this.totalPages = Math.ceil(data.totalCount / this.pageSize);
        this.isLoaded = true;
        this.fillRange();



        this.alertService.success('Title', 'Данные обновились','' );
      });
  }
  fillRange(){
    let step: number = this.totalPages> 9 ? 9 : this.totalPages - 1;

    if(this.currentPage === this.currentMinRange){
      console.log(this.totalPages);
      this.pages = new Array<number>(step);
      let indx:number = this.currentMinRange - 1;

      for (let i = 0; i <= step; i++){
        indx = indx + 1;
        this.pages[i] = indx;
      }
    }

    if(this.currentPage > this.currentMaxRange){

      this.currentMinRange = this.currentMaxRange + 1;
      this.currentMaxRange = this.currentMinRange + 9;
      this.pages = [];

      let indx:number = this.currentMinRange - 1;

      if(this.currentMaxRange >= this.totalPages){
        step = this.totalPages - (this.currentMinRange);
      }

      this.pages = new Array<number>(step);
      for (let i = 0; i <= step; i++){
        indx = indx + 1;
        this.pages[i] = indx;
      }
    }

    if(this.currentPage < this.currentMinRange){

      this.currentMaxRange = this.currentMinRange - 1;
      this.currentMinRange = this.currentMaxRange - 9;

      this.pages = [];

      let indx:number = this.currentMinRange - 1;

      if(this.currentMaxRange >= this.totalPages){
        step = this.totalPages - (this.currentMinRange);
      }

      this.pages = new Array<number>(step);
      for (let i = 0; i <= step; i++){
        indx = indx + 1;
        this.pages[i] = indx;
      }
    }
  }

  onCurrentPage(event){
    this.currentPage = Number(event);
    this.getData(this.currentPage, this.pageSize);
  }

  onBack(){
    if(this.currentPage !==1){
      this.currentPage = this.currentPage - 1;
      this.getData(this.currentPage, this.pageSize);
    }
  }

  onNext(){
    if(this.currentPage !==this.totalCount){
      this.currentPage = this.currentPage + 1;
      this.getData(this.currentPage, this.pageSize);
    }
  }

  //отлавливает изменения размера сплита
  transitionEnd(){
    this.splitService.updateMap();
  }
}
