import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from "../../services/http-service.service";
import {AlertService} from "../../services/alert.service";
import {ModalPubSubService} from "../../services/modal-pub-sub.service";
import {PageContext, VehicleModelPageFilter, VehiclePageFilter} from "../../models/pageContext";
import {Vehicle, VehicleModel} from "../../models/Vehicle";
import {VehicleModelService} from "../../services/vehicle-model.service";
import {VehicleModelDto} from "../../models/vehicleModelDto";

@Component({
  selector: 'app-vehicle-model',
  templateUrl: './vehicle-model.component.html',
  styleUrls: ['./vehicle-model.component.scss']
})
export class VehicleModelComponent implements OnInit {
  models: VehicleModelDto[];
  totalCount: number;
  totalPages: Array<number>;
  currentPage:number;

  constructor( private httpClient: VehicleModelService,
               private alertService: AlertService,
               private modalPubSubService: ModalPubSubService) { }

  ngOnInit(): void {
    this.getData(1, 12);
  }
  getData(pageIndex:number, pageSize:number){
    let command: PageContext<VehicleModelPageFilter> = {
      pageIndex: pageIndex,
      pageSize: pageSize,
      filter: {
       vehicleTypeId:null,
        vehicleModelId: null,
        chassisId: null
      },
      listSort: null
    };

    this.httpClient.getModelsPage(command)
      .subscribe(data => {
        this.models = data.data;
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
