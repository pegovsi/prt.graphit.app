import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {UsersService} from "../../../services/users.service";
import {MilitaryPositionPageFilter, PageContext, UserPageFilter, VehiclePageFilter} from "../../../models/pageContext";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-users-settings',
  templateUrl: './users-settings.component.html',
  styleUrls: ['./users-settings.component.scss']
})
export class UsersSettingsComponent implements OnInit {
  isLoaded:boolean = true;
  users:User[] = [];
  totalCount: number;
  pages: Array<number>;
  totalPages:number = 0;
  pageSize:number = 12;
  currentPage:number  = 1;
  currentMinRange:number = 1;
  currentMaxRange:number = 10;

  constructor(
    private alertService: AlertService,
    private usersService: UsersService) { }

  ngOnInit(): void {
    this.isLoaded = false;
    this.getData(1, this.pageSize);
  }

  getData(pageIndex:number, pageSize:number){
    let command: PageContext<UserPageFilter> = {
      pageIndex: 1,
      pageSize: 10,
      filter: {
        userId: null,
        firstName: null,
        lastName:null,
        middleName: null
      },
      listSort: null
    };

    this.usersService.getUsersPage(command).subscribe(data=>{
      this.users = data.data;
      this.totalCount = data.totalCount;
      this.totalPages = Math.ceil(data.totalCount / this.pageSize);
      this.isLoaded = true;
      this.fillRange();
    });
  }

  fillRange(){
    let step: number = this.totalPages> 9 ? 9 : this.totalPages - 1;

    if(this.currentPage === this.currentMinRange){
      this.pages = new Array<number>(step);
      let indx:number = this.currentMinRange - 1;

      for (let i = 0; i <= step; i++){
        indx = indx + 1;
        this.pages[i] = indx;
      }
    }

    if(this.currentPage > this.currentMaxRange){

      this.currentMinRange = this.currentMaxRange + 1;
      this.currentMaxRange = this.currentMinRange + 9;
      this.pages = [];

      let indx:number = this.currentMinRange - 1;

      if(this.currentMaxRange >= this.totalPages){
        step = this.totalPages - (this.currentMinRange);
      }

      this.pages = new Array<number>(step);
      for (let i = 0; i <= step; i++){
        indx = indx + 1;
        this.pages[i] = indx;
      }
    }

    if(this.currentPage < this.currentMinRange){

      this.currentMaxRange = this.currentMinRange - 1;
      this.currentMinRange = this.currentMaxRange - 9;

      this.pages = [];

      let indx:number = this.currentMinRange - 1;

      if(this.currentMaxRange >= this.totalPages){
        step = this.totalPages - (this.currentMinRange);
      }

      this.pages = new Array<number>(step);
      for (let i = 0; i <= step; i++){
        indx = indx + 1;
        this.pages[i] = indx;
      }
    }
  }

  onCurrentPage(event){
    this.currentPage = Number(event);
    this.getData(this.currentPage, this.pageSize);
  }

  onBack(){
    if(this.currentPage !==1){
      this.currentPage = this.currentPage - 1;
      this.getData(this.currentPage, this.pageSize);
    }
  }

  onNext(){
    if(this.currentPage !==this.totalCount){
      this.currentPage = this.currentPage + 1;
      this.getData(this.currentPage, this.pageSize);
    }
  }

}
