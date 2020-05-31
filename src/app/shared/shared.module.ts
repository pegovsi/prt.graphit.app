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
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [

    MainLayoutComponent,
    HttpClientModule,
    AlertComponent,
    AsideComponent,
    HeaderComponent,

  ],
  providers:[
    INTERCEPTOR_PROVIDER,
    HttpServiceService,
    AlertService,
    JwtHelper,
    AuthGuard
  ]
})
export class SharedModule { }
