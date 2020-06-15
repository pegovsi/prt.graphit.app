import {NgModule, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpServiceService} from "../services/http-service.service";
import { AlertComponent } from './components/alert/alert.component';
import {AlertService} from "../services/alert.service";
import {AuthGuard} from "../services/auth.guard";
import {AuthInterceptor} from "../auth.interceptor";
import {JwtHelper} from "../services/JwtHelper";
import {AsideComponent} from "../aside/aside.component";
import {HeaderComponent} from "../header/header.component";
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import {ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from '../app-routing.module';
import {RouterModule} from "@angular/router";
import {ModalRefDirective} from "../directives/modalRef.directive";
import { ModalComponent } from './components/modal/modal.component';
import {ModalContainerRefDirective} from "../directives/modalContainerRef.directive";
import {AngularMaterialModule} from "./angular-material.module";
import { ChartsModule } from 'ng2-charts';
import {PreloaderComponent} from "./components/preloader/preloader.component";
import {VehicleCityChartComponent} from "../charts/vehicle-city-chart/vehicle-city-chart.component";
import {VehicleCityChartRadarComponent} from "../charts/vehicle-city-chart-radar/vehicle-city-chart-radar.component";

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AlertComponent,
    MainLayoutComponent,
    AsideComponent,
    HeaderComponent,
    ModalComponent,
    ModalRefDirective,
    ModalContainerRefDirective,
    PreloaderComponent,
    VehicleCityChartComponent,
    VehicleCityChartRadarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    AngularMaterialModule,
    ChartsModule
  ],
  exports: [

    MainLayoutComponent,
    HttpClientModule,
    AlertComponent,
    AsideComponent,
    HeaderComponent,
    AngularMaterialModule,
    ChartsModule,
    PreloaderComponent,
    VehicleCityChartComponent,
    VehicleCityChartRadarComponent
  ],
  providers:[
    INTERCEPTOR_PROVIDER,
    HttpServiceService,
    AlertService,
    JwtHelper,
    AuthGuard
  ],
  entryComponents: [ModalComponent]
})
export class SharedModule { }
