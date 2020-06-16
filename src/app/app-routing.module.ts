import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {PresentationViewComponent} from "./presentation-view/presentation-view.component";
import {PresentationLayoutComponent} from "./shared/components/presentation-layout/presentation-layout.component";
import {LoginLayoutComponent} from "./shared/components/login-layout/login-layout.component";
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./services/auth.guard";
import {JournalEventsComponent} from "./shared/components/journal-events/journal-events.component";

const routes: Routes = [{
  path:'', component: MainLayoutComponent, canActivate:[AuthGuard], children:[
    { path:'', redirectTo:'/dashboard', pathMatch:'full' },
    { path:'dashboard', component: DashboardComponent },
    { path:'events', component: JournalEventsComponent }
  ]
},
  {
  path:'presentation', component: PresentationLayoutComponent,canActivate:[AuthGuard], children:[
    { path:'presentation', redirectTo:'presentation', pathMatch:'full' },
    { path:'presentation', component: PresentationViewComponent }
]},{
    path: 'login', component: LoginLayoutComponent
},{
   path: 'vehicle', loadChildren:  ()=> import('./vehicle/vehicle.module').then(x=>x.VehicleModule)
},{
   path: 'settings', loadChildren: ()=> import('./modules/settings/settings.module').then(x=>x.SettingsModule)
},{
   path: 'mdm', loadChildren: ()=> import('./mdm/mdm.module').then(x=>x.MdmModule)
},{
    path: 'repair', loadChildren: ()=> import('./modules/repair/repair.module').then(x=>x.RepairModule)
},{
    path: 'warehouse', loadChildren: ()=> import('./modules/warehouse/warehouse.module').then(x=>x.WarehouseModule)
},{
    path: 'messenger', loadChildren: ()=> import('./modules/messenger/messenger.module').then(x=>x.MessengerModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
