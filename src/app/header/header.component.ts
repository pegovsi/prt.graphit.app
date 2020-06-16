import { Component, OnInit } from '@angular/core';
import {JwtHelper} from "../services/JwtHelper";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {EventsService} from "../services/events.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName:string;
  constructor(private jwtHelper: JwtHelper,
              private autService: AuthService,
              private eventService: EventsService,
              private router: Router) { }

  ngOnInit(): void {
    let jwt = this.jwtHelper.decodeToken(localStorage.getItem("token"));
    this.userName = jwt.login;
  }

  logout(){
    this.autService.logout();
    this.router.navigate(['/login']);
  }

  getEvents(){
    return this.eventService.eventsNew.length;
  }
}
