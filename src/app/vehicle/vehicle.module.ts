import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { VehicleHomeComponent } from './vehicle-home/vehicle-home.component';
import {MainLayoutComponent} from "../shared/components/main-layout/main-layout.component";
import {AsideComponent} from "../aside/aside.component";
import {HeaderComponent} from "../header/header.component";

const routes: Routes =[{
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/vehicle/vehicles', pathMatch: 'full'},
      {path: 'vehicles', component: VehicleHomeComponent}
    ]
  }];
@NgModule({
  declarations: [
    MainLayoutComponent,
    VehicleHomeComponent,
    AsideComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class VehicleModule { }
