import { Component, OnInit } from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {ModalPubSubService} from "../../services/modal-pub-sub.service";
import {PageContext, UserMasterDataFilter, VehiclePageFilter} from "../../models/pageContext";
import {UserMasterDataService} from "../../services/user-master-data.service";
import {UserMasterDataDto} from "../../models/userMasterDataDto";

@Component({
  selector: 'app-constructor-models',
  templateUrl: './constructor-models.component.html',
  styleUrls: ['./constructor-models.component.scss']
})
export class ConstructorModelsComponent implements OnInit {

  isLoaded:boolean = true;
  userMasterDatas: UserMasterDataDto[];
  totalCount: number;
  pages: Array<number>;
  totalPages:number = 0;
  pageSize:number = 12;
  currentPage:number  = 1;
  currentMinRange:number = 1;
  currentMaxRange:number = 10;

  constructor(private httpClient: UserMasterDataService,
              private alertService: AlertService,
              private modalPubSubService: ModalPubSubService) { }

  ngOnInit(): void {
    this.isLoaded = false;
    this.getData(1, this.pageSize);
  }

  getData(pageIndex:number, pageSize:number){
    let command: PageContext<UserMasterDataFilter> = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: {
        vehicleModelId:null
      },
      listSort: null
    };

    this.httpClient.getModelsPage(command)
      .subscribe(data => {
        this.userMasterDatas = data.data;
        this.totalCount = data.totalCount;
        this.totalPages = Math.ceil(data.totalCount / this.pageSize);
        this.isLoaded = true;
        this.fillRange();
        this.alertService.success('Title', 'Данные обновились','' );
      });
  }

  fillRange(){
    let step: number = 9;

    if(this.currentPage === this.currentMinRange){
      this.pages = new Array<number>(9);
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
