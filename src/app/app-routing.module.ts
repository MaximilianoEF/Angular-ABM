import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [{
  path:'', redirectTo: 'inicio', pathMatch: 'full'
}, {
  path: 'inicio', component: InicioComponent
}, {
  path: 'productos', component: ProductosComponent
}, {
  path: 'pedidos', component: PedidosComponent
}, {
  path: '**', redirectTo: 'inicio', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
