import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {HttpServiceService} from "../../services/http-service.service";
import {Vehicle} from "../../models/Vehicle";
import {Observable, range} from 'rxjs';
import {AlertService} from "../../services/alert.service";
import {PageContext, VehiclePageFilter} from "../../models/pageContext";
import {ModalPubSubService} from "../../services/modal-pub-sub.service";
import {formatNumber} from "@angular/common";

@Component({
  selector: 'app-vehicle-home',
  templateUrl: './vehicle-home.component.html',
  styleUrls: ['./vehicle-home.component.scss'],
  providers:[HttpServiceService]
})
export class VehicleHomeComponent implements OnInit {

  isLoaded:boolean = true;
  vehicles: Vehicle[];
  totalCount: number;
  pages: Array<number>;
  totalPages:number = 0;
  pageSize:number = 12;
  currentPage:number  = 1;
  currentMinRange:number = 1;
  currentMaxRange:number = 10;

  //@ViewChild('modalRef', {static: false,  read: ViewContainerRef}) containerRef: ViewContainerRef;
  //@ViewChild(ModalRefDirective, {static: false,  read: ViewContainerRef}) containerRef: ViewContainerRef;

  constructor(
    private httpClient: HttpServiceService,
    private alertService: AlertService,
    private modalPubSubService: ModalPubSubService) { }

  ngOnInit(): void {
    this.isLoaded = false;
    this.getData(1, this.pageSize);
  }

  // showModal(){
  //   const modalFactory = this.resolver.resolveComponentFactory(ModalComponent);
  //   this.containerRef.clear();
  //
  //   const component = this.containerRef.createComponent(modalFactory);
  //   component.instance.title='sdgsdsd';
  //   component.instance.close.subscribe(()=>{
  //     this.containerRef.clear()
  //   });
  // }

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
        //this.alertService.success('Title', 'Данные обновились','' );
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

