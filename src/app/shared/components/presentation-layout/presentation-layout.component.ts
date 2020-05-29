import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-presentation-layout',
  templateUrl: './presentation-layout.component.html',
  styleUrls: ['./presentation-layout.component.scss']
})
export class PresentationLayoutComponent implements OnInit {

  icon_v: string;
  icon_p:string;
  icon_o:string;
  icon_m:string;
  icon_logo_prt:string;

  constructor() { }

  ngOnInit(): void {
    this.icon_v = 'assets/techicon.png';
    this.icon_p = 'assets/indicate panel_y.png';
    this.icon_o = 'assets/orders plan_y.png';
    this.icon_m = 'assets/smsicon.png';
    this.icon_logo_prt = 'assets/pt.jpg';
  }

}
