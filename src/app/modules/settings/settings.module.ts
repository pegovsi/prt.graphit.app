import {MainLayoutComponent} from "../../shared/components/main-layout/main-layout.component";
import {SharedModule} from "../../shared/shared.module";
import {HttpServiceService} from "../../services/http-service.service";
import {AuthGuard} from "../../services/auth.guard";
import {ReactiveFormsModule} from "@angular/forms";
import {AsideComponent} from "../../aside/aside.component";
import {HeaderComponent} from "../../header/header.component";
import { MainSettingsComponent } from './main-settings/main-settings.component';
import {CommonModule} from "@angular/common";
import {RouterModule, Routes } from "@angular/router";
import {NgModule} from "@angular/core";
import {UsersSettingsComponent} from "./users-settings/users-settings.component";


const routes: Routes =[{
  path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/vehicle/vehicles', pathMatch: 'full'},
    {path: 'main', component: MainSettingsComponent, canActivate:[AuthGuard]},
    {path: 'users', component: UsersSettingsComponent, canActivate:[AuthGuard]}
  ]
}];

@NgModule({
  declarations: [
    /*MainLayoutComponent,*/
    MainSettingsComponent,
    UsersSettingsComponent
    /*AsideComponent,
    HeaderComponent*/
  ],
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
export class SettingsModule { }
