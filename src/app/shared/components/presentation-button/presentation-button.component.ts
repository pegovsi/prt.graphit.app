import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentation-button',
  templateUrl: './presentation-button.component.html',
  styleUrls: ['./presentation-button.component.scss']
})
export class PresentationButtonComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() src:string;
  @Input() name:string;
  @Input() doubleName:string;
  @Input() module:string;
  @Input() path:string;

  ngOnInit(): void {

  }

  onClick(){
    this.router.navigate(['/'+this.module, this.path]);
  }

}

