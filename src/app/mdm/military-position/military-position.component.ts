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
  data: MilitaryPosition[];
  totalCount: number;
  totalPages: Array<number>;
  currentPage:number;
  constructor(private httpClient: MilitaryPositionService,
              private alertService: AlertService,
              private modalPubSubService: ModalPubSubService) { }

  ngOnInit(): void {
    this.getData(1, 12);
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

  showModal(event) {
    this.modalPubSubService.showDialogModal(event);
  }

}
