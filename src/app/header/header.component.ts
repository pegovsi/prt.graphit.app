import { Component, OnInit } from '@angular/core';
import {JwtHelper} from "../services/JwtHelper";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName:string;
  constructor(private jwtHelper: JwtHelper) { }

  ngOnInit(): void {
    let jwt = this.jwtHelper.decodeToken(localStorage.getItem("token"));
    this.userName = jwt.login;
  }

}
