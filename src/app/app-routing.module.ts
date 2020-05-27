import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {PresentationViewComponent} from "./presentation-view/presentation-view.component";
import {PresentationLayoutComponent} from "./shared/components/presentation-layout/presentation-layout.component";


const routes: Routes = [{
  path:'', component: PresentationLayoutComponent, children:[
    { path:'', redirectTo:'/', pathMatch:'full' },
    { path:'', component: PresentationViewComponent }
]},{
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
