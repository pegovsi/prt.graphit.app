import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { VehicleHomeComponent } from './vehicle-home/vehicle-home.component';
import {MainLayoutComponent} from "../shared/components/main-layout/main-layout.component";
import {SharedModule} from "../shared/shared.module";
import {HttpServiceService} from "../services/http-service.service";
import {AuthGuard} from "../services/auth.guard";
import {ReactiveFormsModule} from "@angular/forms";
import {AsideComponent} from "../aside/aside.component";
import {HeaderComponent} from "../header/header.component";
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import {MapVehiclesComponent} from "../map-vehicles/map-vehicles.component";
import {AngularSplitModule} from "angular-split";
import {ModalRefDirective} from "../directives/modalRef.directive";
import {ModalComponent} from "../shared/components/modal/modal.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { VehicleModelComponent } from './vehicle-model/vehicle-model.component';
import { CrewComponent } from './crew/crew.component';


const routes: Routes =[{
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/vehicle/map', pathMatch: 'full'},
      {path: 'map', component: MapVehiclesComponent, canActivate:[AuthGuard]},
      {path: 'models', component: VehicleModelComponent, canActivate:[AuthGuard]},
      {path: 'vehicles', component: VehicleHomeComponent, canActivate:[AuthGuard]},
      {path: 'vehicle/:id/edit', component: VehicleDetailsComponent, canActivate:[AuthGuard]},
      {path: 'crew', component: CrewComponent, canActivate:[AuthGuard]},
      {path: 'crew/:id/edit', component: VehicleDetailsComponent, canActivate:[AuthGuard]}
    ]
  }];
@NgModule({
  declarations: [
    /*MainLayoutComponent,*/
    VehicleHomeComponent,
    VehicleDetailsComponent,
    VehicleModelComponent,
    CrewComponent,

    /*AsideComponent,
    HeaderComponent*/
  ],
    imports: [
        CommonModule,
        SharedModule,
        AngularSplitModule.forRoot(),
        RouterModule.forChild(routes),
        NgbModule
    ],
  exports:[RouterModule],
  providers:[
    HttpServiceService
  ]
})
export class VehicleModule { }
