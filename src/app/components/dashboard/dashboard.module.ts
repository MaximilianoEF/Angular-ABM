import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

//Components
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { ProductosComponent } from './productos/productos.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { CrearPedidosComponent } from './pedidos/crear-pedidos/crear-pedidos.component';
import { DialogDataExampleComponent } from './pedidos/dialog-data-example/dialog-data-example.component';



@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    PedidosComponent,
    ProductosComponent,
    CrearProductoComponent,
    CrearPedidosComponent,
    DialogDataExampleComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
