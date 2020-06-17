import { Component, OnInit } from '@angular/core';
import {VehicleModelDto} from "../../models/vehicleModelDto";
import {VehicleModelService} from "../../services/vehicle-model.service";
import {AlertService} from "../../services/alert.service";
import {ModalPubSubService} from "../../services/modal-pub-sub.service";
import {CrewPageFilter, PageContext, VehicleModelPageFilter} from "../../models/pageContext";
import {CrewService} from "../../services/crew.service";
import {CrewDto} from "../../models/crewDto";

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss']
})
export class CrewComponent implements OnInit {
  isLoaded:boolean = true;
  crews: CrewDto[];
  totalCount: number;
  pages: Array<number>;
  totalPages:number = 0;
  pageSize:number = 12;
  currentPage:number  = 1;
  currentMinRange:number = 1;
  currentMaxRange:number = 10;

  constructor(private httpClient: CrewService,
              private alertService: AlertService,
              private modalPubSubService: ModalPubSubService) { }

  ngOnInit(): void {
    this.isLoaded = false;
    this.getData(1, 12);
  }
  getData(pageIndex:number, pageSize:number){
    let command: PageContext<CrewPageFilter> = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: {
        vehicleId:null,
        militaryFormationId: null
      },
      listSort: null
    };

    this.httpClient.getCrewsPage(command)
      .subscribe(data => {
        this.crews = data.data;
        this.totalCount = data.totalCount;
        this.totalPages = Math.ceil(data.totalCount / this.pageSize);
        this.isLoaded = true;
        this.fillRange();
      });
  }

  fillRange(){
    let step: number = this.totalPages> 9 ? 9 : this.totalPages - 1;

    if(this.currentPage === this.currentMinRange){
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

  showModal(event) {
    this.modalPubSubService.showDialogModal(event);
  }
}
