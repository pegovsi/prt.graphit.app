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
  crews: CrewDto[];
  totalCount: number;
  totalPages: Array<number>;
  currentPage:number;

  constructor(private httpClient: CrewService,
              private alertService: AlertService,
              private modalPubSubService: ModalPubSubService) { }

  ngOnInit(): void {
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
