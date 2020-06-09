import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PresentationViewComponent } from './presentation-view/presentation-view.component';
import { PresentationLayoutComponent } from './shared/components/presentation-layout/presentation-layout.component';
import { PresentationButtonComponent } from './shared/components/presentation-button/presentation-button.component';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './shared/components/login-layout/login-layout.component';
import {SharedModule} from "./shared/shared.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { MapComponent } from './map/map.component';
import { MapVehiclesComponent } from './map-vehicles/map-vehicles.component';
import {AngularSplitModule} from "angular-split";
import {ModalRefDirective} from "./directives/modalRef.directive";
import {ModalComponent} from "./shared/components/modal/modal.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdmHomeComponent } from './mdm/mdm-home/mdm-home.component';
import { VehicleCityChartComponent } from './charts/vehicle-city-chart/vehicle-city-chart.component';
import { VehicleCityChartRadarComponent } from './charts/vehicle-city-chart-radar/vehicle-city-chart-radar.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    PresentationViewComponent,
    PresentationLayoutComponent,
    PresentationButtonComponent,
    LoginComponent,
    LoginLayoutComponent,
    DashboardComponent,
    MapComponent,
    MapVehiclesComponent,
    VehicleCityChartComponent,
    VehicleCityChartRadarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        AngularSplitModule,
        BrowserAnimationsModule
    ],
  providers: [
    INTERCEPTOR_PROVIDER
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
