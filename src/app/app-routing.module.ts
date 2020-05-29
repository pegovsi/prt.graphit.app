import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {PresentationViewComponent} from "./presentation-view/presentation-view.component";
import {PresentationLayoutComponent} from "./shared/components/presentation-layout/presentation-layout.component";
import {LoginLayoutComponent} from "./shared/components/login-layout/login-layout.component";
import {LoginComponent} from "./login/login.component";
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./services/auth.guard";


const routes: Routes = [{
  path:'', component: MainLayoutComponent, canActivate:[AuthGuard], children:[
    { path:'', redirectTo:'/', pathMatch:'full' },
    { path:'dashboard', component: DashboardComponent }
  ]
},
  {
  path:'presentation', component: PresentationLayoutComponent,canActivate:[AuthGuard], children:[
    { path:'presentation', redirectTo:'presentation', pathMatch:'full' },
    { path:'presentation', component: PresentationViewComponent }
]},{
    path: 'login', component: LoginLayoutComponent
},{
   path: 'vehicle', loadChildren: ()=> import('./vehicle/vehicle.module').then(x=>x.VehicleModule)
}];
/*'./app/vehicle/vehicle.module#VehicleModule'*/
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
