import {MainLayoutComponent} from "../shared/components/main-layout/main-layout.component";
import {SharedModule} from "../shared/shared.module";
import {HttpServiceService} from "../services/http-service.service";
import {AuthGuard} from "../services/auth.guard";
import {ReactiveFormsModule} from "@angular/forms";


import {CommonModule} from "@angular/common";
import {RouterModule, Routes } from "@angular/router";
import {NgModule} from "@angular/core";

import {MdmHomeComponent} from "./mdm-home/mdm-home.component";
import { LevelManagementComponent } from './level-management/level-management.component';
import { MilitaryFormationComponent } from './military-formation/military-formation.component';
import { MilitaryPositionComponent } from './military-position/military-position.component';


const routes: Routes =[{
  path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/mdm/main', pathMatch: 'full'},
    {path: 'main', component: MdmHomeComponent, canActivate:[AuthGuard]},
    {path: 'level-menagement', component: LevelManagementComponent, canActivate:[AuthGuard]},
    {path: 'military-formation', component: MilitaryFormationComponent, canActivate:[AuthGuard]},
    {path: 'military-position', component: MilitaryPositionComponent, canActivate:[AuthGuard]}
  ]
}];

@NgModule({
  declarations: [
    /*MainLayoutComponent,*/
    MdmHomeComponent,
    LevelManagementComponent,
    MilitaryFormationComponent,
    MilitaryPositionComponent
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
export class MdmModule { }
