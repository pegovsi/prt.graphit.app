import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef} from '@angular/core';
import {ModalContainerRefDirective} from "../../../directives/modalContainerRef.directive";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() title ='';
  @Output() close: EventEmitter<void> = new EventEmitter<void>()
  @ViewChild(ModalContainerRefDirective, {static: true,  read: ViewContainerRef}) modalContainerRef: ViewContainerRef;

  constructor() { }

  ngOnInit(): void {
  }

}
