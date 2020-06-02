import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector:'[modalContainerRef]'
})
export class ModalContainerRefDirective {
  constructor(public modalContainer: ViewContainerRef) {
  }
}
