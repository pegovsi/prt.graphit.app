import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  constructor(private router: Router) { }

  isToggled:boolean;
  ngOnInit(): void {
    this.isToggled = false;
  }

  onToggled(){
    this.isToggled = !this.isToggled;
  }

}
