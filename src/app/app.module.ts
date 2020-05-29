import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PresentationViewComponent } from './presentation-view/presentation-view.component';
import { PresentationLayoutComponent } from './shared/components/presentation-layout/presentation-layout.component';
import { PresentationButtonComponent } from './shared/components/presentation-button/presentation-button.component';
import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './shared/components/login-layout/login-layout.component';
import {SharedModule} from "./shared/shared.module";
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    PresentationViewComponent,
    PresentationLayoutComponent,
    PresentationButtonComponent,
    LoginComponent,
    LoginLayoutComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
