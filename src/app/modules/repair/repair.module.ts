import {MainLayoutComponent} from "../../shared/components/main-layout/main-layout.component";
import {SharedModule} from "../../shared/shared.module";
import {HttpServiceService} from "../../services/http-service.service";
import {AuthGuard} from "../../services/auth.guard";

import {CommonModule} from "@angular/common";
import {RouterModule, Routes } from "@angular/router";
import {NgModule} from "@angular/core";
import { RepairDocumentsLayoutComponent } from './repair-documents-layout/repair-documents-layout.component';
import { RepairDocumentsPlansComponent } from './repair-documents-plans/repair-documents-plans.component';
import { RepairDocumentsWorkingComponent } from './repair-documents-working/repair-documents-working.component';
import { RepairReportsComponent } from './repair-reports/repair-reports.component';
import {AppModule} from "../../app.module";
import {VehicleCityChartRadarComponent} from "../../charts/vehicle-city-chart-radar/vehicle-city-chart-radar.component";



const routes: Routes =[{
  path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/repair/repairs', pathMatch: 'full'},
    {path: 'repairs', component: RepairDocumentsLayoutComponent, canActivate:[AuthGuard]},
    {path: 'reports', component: RepairReportsComponent, canActivate:[AuthGuard]}
  ]
}];

@NgModule({
  declarations: [
    RepairDocumentsLayoutComponent,
    RepairDocumentsPlansComponent,
    RepairDocumentsWorkingComponent,
    RepairReportsComponent
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
export class RepairModule { }
