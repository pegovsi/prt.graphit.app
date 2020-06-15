import {MainLayoutComponent} from "../../shared/components/main-layout/main-layout.component";
import {SharedModule} from "../../shared/shared.module";
import {HttpServiceService} from "../../services/http-service.service";
import {AuthGuard} from "../../services/auth.guard";

import {CommonModule} from "@angular/common";
import {RouterModule, Routes } from "@angular/router";
import {NgModule} from "@angular/core";
import { WarehousesComponent } from './warehouses/warehouses.component';
import { WarehouseDetailComponent } from './warehouse-detail/warehouse-detail.component';
import { WarehouseDocumentsLayoutComponent } from './warehouse-documents-layout/warehouse-documents-layout.component';
import { WarehouseDocumentPurchaseComponent } from './warehouse-document-purchase/warehouse-document-purchase.component';
import { WarehouseDocumentMovementsComponent } from './warehouse-document-movements/warehouse-document-movements.component';
import { WarehouseDocumentTorepairComponent } from './warehouse-document-torepair/warehouse-document-torepair.component';
import { WarehouseDocumentOrderComponent } from './warehouse-document-order/warehouse-document-order.component';
import { WarehouseReportComponent } from './warehouse-report/warehouse-report.component';
import { WarehouseChartMainComponent } from './warehouse-charts/warehouse-chart-main/warehouse-chart-main.component';



const routes: Routes =[{
  path: '', component: MainLayoutComponent, children: [
    {path: '', redirectTo: '/warehouse/warehouses', pathMatch: 'full'},
    {path: 'warehouses', component: WarehousesComponent, canActivate:[AuthGuard]},
    {path: 'warehouse/:id/edit', component: WarehouseDetailComponent, canActivate:[AuthGuard]},
    {path: 'documents', component: WarehouseDocumentsLayoutComponent, canActivate:[AuthGuard]},
    {path: 'reports', component: WarehouseReportComponent, canActivate:[AuthGuard]},
  ]
}];

@NgModule({
  declarations: [
  WarehousesComponent,
  WarehouseDetailComponent,
  WarehouseDocumentsLayoutComponent,
  WarehouseDocumentPurchaseComponent,
  WarehouseDocumentMovementsComponent,
  WarehouseDocumentTorepairComponent,
  WarehouseDocumentOrderComponent,
  WarehouseReportComponent,
  WarehouseChartMainComponent
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
export class WarehouseModule { }
