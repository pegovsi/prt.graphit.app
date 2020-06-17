import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { VehicleHomeComponent } from './vehicle-home/vehicle-home.component';
import {MainLayoutComponent} from "../shared/components/main-layout/main-layout.component";
import {SharedModule} from "../shared/shared.module";
import {HttpServiceService} from "../services/http-service.service";
import {AuthGuard} from "../services/auth.guard";
import {ReactiveFormsModule} from "@angular/forms";
import { VehicleDetailsComponent } from './vehicle-details/vehicle-details.component';
import {MapVehiclesComponent} from "../map-vehicles/map-vehicles.component";
import {AngularSplitModule} from "angular-split";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { VehicleModelComponent } from './vehicle-model/vehicle-model.component';
import { CrewComponent } from './crew/crew.component';
import { ConstructorModelsComponent } from './constructor-models/constructor-models.component';
import { ConstructorModelsCreateComponent } from './constructor-models-create/constructor-models-create.component';
import { ConstructorModelsEditComponent } from './constructor-models-edit/constructor-models-edit.component';
import { CrewCreateComponent } from './crew-create/crew-create.component';
import { CrewEditComponent } from './crew-edit/crew-edit.component';


const routes: Routes =[{
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/vehicle/map', pathMatch: 'full'},
      {path: 'map', component: MapVehiclesComponent, canActivate:[AuthGuard]},
      {path: 'models', component: VehicleModelComponent, canActivate:[AuthGuard]},
      {path: 'vehicles', component: VehicleHomeComponent, canActivate:[AuthGuard]},
      {path: 'vehicle/:id/edit', component: VehicleDetailsComponent, canActivate:[AuthGuard]},
      {path: 'crew', component: CrewComponent, canActivate:[AuthGuard]},
      {path: 'crew/:id/edit', component: CrewEditComponent, canActivate:[AuthGuard]},
      {path: 'crew/create', component: CrewCreateComponent, canActivate:[AuthGuard]},
      {path: 'constructor-models', component: ConstructorModelsComponent, canActivate:[AuthGuard]},
      {path: 'constructor-models-create', component: ConstructorModelsCreateComponent, canActivate:[AuthGuard]},
      {path: 'constructor-models/:id/edit', component: ConstructorModelsEditComponent, canActivate:[AuthGuard]}
    ]
  }];
@NgModule({
  declarations: [
    VehicleHomeComponent,
    VehicleDetailsComponent,
    VehicleModelComponent,
    CrewComponent,
    ConstructorModelsComponent,
    ConstructorModelsCreateComponent,
    ConstructorModelsEditComponent,
    CrewCreateComponent,
    CrewEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AngularSplitModule.forRoot(),
    RouterModule.forChild(routes),
    NgbModule,
    ReactiveFormsModule
  ],
  exports:[RouterModule],
  providers:[
    HttpServiceService
  ]
})
export class VehicleModule { }
