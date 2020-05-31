import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user";
import {UsersService} from "../../../services/users.service";
import {PageContext, UserPageFilter, VehiclePageFilter} from "../../../models/pageContext";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-users-settings',
  templateUrl: './users-settings.component.html',
  styleUrls: ['./users-settings.component.scss']
})
export class UsersSettingsComponent implements OnInit {

  users:User[];
  totalCount:number;

  constructor(
    private alertService: AlertService,
    private usersService: UsersService) { }

  ngOnInit(): void {


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

      this.alertService.success('Title', 'Данные обновились','' )
    });
  }

}
