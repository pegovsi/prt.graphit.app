import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ModalRefDirective} from "../../../directives/modalRef.directive";
import {ModalComponent} from "../modal/modal.component";
import {ModalService} from "../../../services/modal.service";
import {ModalPubSubService} from "../../../services/modal-pub-sub.service";
import {VehicleDetailsComponent} from "../../../vehicle/vehicle-details/vehicle-details.component";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  @ViewChild(ModalRefDirective, {static: false,  read: ViewContainerRef}) containerRef: ViewContainerRef;

  constructor(
    private modalService: ModalService,
    private modalPubSubService: ModalPubSubService) { }

  ngOnInit(): void {
    this.modalPubSubService.dynamicComponent$.subscribe(data=>{
      this.modalService.showDialogModal<VehicleDetailsComponent>
          (this.containerRef, data, VehicleDetailsComponent);
    })
  }

  showModal(){
  }

}
