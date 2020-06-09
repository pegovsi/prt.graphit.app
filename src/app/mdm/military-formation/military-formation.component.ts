import { Component, OnInit } from '@angular/core';
import {LevelManagement} from "../../models/crewDto";
import {AlertService} from "../../services/alert.service";
import {ModalPubSubService} from "../../services/modal-pub-sub.service";
import {MilitaryFormationService} from "../../services/military-formation.service";
import {MilitaryFormationPageFilter, PageContext} from "../../models/pageContext";
import {MilitaryFormationDto} from "../../models/militaryFormationDto";

@Component({
  selector: 'app-military-formation',
  templateUrl: './military-formation.component.html',
  styleUrls: ['./military-formation.component.scss']
})
export class MilitaryFormationComponent implements OnInit {

  data: MilitaryFormationDto[];
  totalCount: number;
  totalPages: Array<number>;
  currentPage:number;

  constructor(private httpClient: MilitaryFormationService,
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
