import { Component, OnInit } from '@angular/core';
import {LevelManagement, MilitaryPosition} from "../../models/crewDto";
import {MilitaryFormationPageFilter, MilitaryPositionPageFilter, PageContext} from "../../models/pageContext";
import {MilitaryPositionService} from "../../services/military-position.service";
import {AlertService} from "../../services/alert.service";
import {ModalPubSubService} from "../../services/modal-pub-sub.service";

@Component({
  selector: 'app-military-position',
  templateUrl: './military-position.component.html',
  styleUrls: ['./military-position.component.scss']
})
export class MilitaryPositionComponent implements OnInit {
  isLoaded:boolean = true;
  data: MilitaryPosition[];
  totalCount: number;
  pages: Array<number>;
  totalPages:number = 0;
  pageSize:number = 12;
  currentPage:number  = 1;
  currentMinRange:number = 1;
  currentMaxRange:number = 10;

  constructor(private httpClient: MilitaryPositionService,
              private alertService: AlertService,
              private modalPubSubService: ModalPubSubService) { }

  ngOnInit(): void {
    this.isLoaded = false;
    this.getData(1, this.pageSize);
  }

  getData(pageIndex:number, pageSize:number){
    let command: PageContext<MilitaryPositionPageFilter> = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: {
        militaryPositionId:null
      },
      listSort: null
    };

    this.httpClient.getDataPage(command)
      .subscribe(data => {
        this.data = data.data;
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
