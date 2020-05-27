import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PresentationViewComponent } from './presentation-view/presentation-view.component';
import { PresentationLayoutComponent } from './shared/components/presentation-layout/presentation-layout.component';
import { PresentationButtonComponent } from './shared/components/presentation-button/presentation-button.component';



@NgModule({
  declarations: [
    AppComponent,
    PresentationViewComponent,
    PresentationLayoutComponent,
    PresentationButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
