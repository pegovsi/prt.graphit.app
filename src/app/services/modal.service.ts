import {ComponentFactory, ComponentFactoryResolver, Injectable, Type, ViewContainerRef} from "@angular/core";
import {Subject} from "rxjs";
import {ModalComponent} from "../shared/components/modal/modal.component";

@Injectable({providedIn: 'root'})
export class ModalService {

  constructor(
    private resolver: ComponentFactoryResolver) {
  }

  showDialogModal<T>(container: ViewContainerRef, vehicleId: string, T){
    const modalFactory = this.resolver.resolveComponentFactory(ModalComponent);
    container.clear();

    const component = container.createComponent(modalFactory);
    component.instance.title='sdgsdsd';
    component.instance.close.subscribe(()=>{
      container.clear()
    });

    const modalChildFactory = this.resolver.resolveComponentFactory(T);
    component.instance.modalContainerRef.clear();
    const componentChild = component.instance.modalContainerRef.createComponent(modalChildFactory);
    componentChild.instance['vehicleId'] = vehicleId;
  }

}
