import {MainLayoutComponent} from "../../shared/components/main-layout/main-layout.component";
import {SharedModule} from "../../shared/shared.module";
import {HttpServiceService} from "../../services/http-service.service";
import {AuthGuard} from "../../services/auth.guard";

import {CommonModule} from "@angular/common";
import {RouterModule, Routes } from "@angular/router";
import {NgModule} from "@angular/core";
import { MessengerLayoutComponent } from './messenger-layout/messenger-layout.component';



const routes: Routes =[{
  path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/messenger/layout', pathMatch: 'full'},
    {path: 'layout', component: MessengerLayoutComponent, canActivate:[AuthGuard]}
  ]
}];

@NgModule({
  declarations: [

  MessengerLayoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  providers:[
    HttpServiceService
  ]
})
export class MessengerModule { }
