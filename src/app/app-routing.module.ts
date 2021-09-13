import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [{
  path:'', redirectTo: 'login', pathMatch: 'full'
}, {
  path: 'login', component: LoginComponent
}, {
  path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(x => x.DashboardModule)
  //Carga perezosa, consiste en retrasar la carga o inicialización de un objeto hasta el mismo momento de su utilización
}, {
  path: '**', redirectTo: 'login', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
