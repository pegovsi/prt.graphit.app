import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector:'[modalRef]'
})
export class ModalRefDirective {
  constructor(public container: ViewContainerRef) {
  }
}
