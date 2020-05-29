import {NgModule, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpServiceService} from "../services/http-service.service";
import { AlertComponent } from './components/alert/alert.component';
import {AlertService} from "../services/alert.service";
import {AuthGuard} from "../services/auth.guard";
import {AuthInterceptor} from "../auth.interceptor";
import {JwtHelper} from "../services/JwtHelper";

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    HttpClientModule,
    AlertComponent
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
