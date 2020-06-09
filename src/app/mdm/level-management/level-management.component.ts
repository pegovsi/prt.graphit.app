import { Component, OnInit } from '@angular/core';
import {CrewService} from "../../services/crew.service";
import {AlertService} from "../../services/alert.service";
import {ModalPubSubService} from "../../services/modal-pub-sub.service";
import {CrewPageFilter, MilitaryFormationPageFilter, PageContext} from "../../models/pageContext";
import {CrewDto, LevelManagement} from "../../models/crewDto";
import {LevelMenagementService} from "../../services/level-menagement.service";

@Component({
  selector: 'app-level-management',
  templateUrl: './level-management.component.html',
  styleUrls: ['./level-management.component.scss']
})
export class LevelManagementComponent implements OnInit {

  levelManagements: LevelManagement[];
  totalCount: number;
  totalPages: Array<number>;
  currentPage:number;

  constructor(private httpClient: LevelMenagementService,
              private alertService: AlertService,
              private modalPubSubService: ModalPubSubService) { }

  ngOnInit(): void {
    this.getData(1, 12);
  }
  getData(pageIndex:number, pageSize:number){
    let command: PageContext<MilitaryFormationPageFilter> = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: {
       levelManagementId:null,
        militaryFormationId:null
      },
      listSort: null
    };

    this.httpClient.getDataPage(command)
      .subscribe(data => {
        this.levelManagements = data.data;
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
