import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";
import { PedidosComponent } from "./pedidos/pedidos.component";
import { ProductosComponent } from "./productos/productos.component";
import { DashboardComponent } from "./dashboard.component";
import { CrearProductoComponent } from "./productos/crear-producto/crear-producto.component";
import { CrearPedidosComponent } from "./pedidos/crear-pedidos/crear-pedidos.component";

const routes: Routes = [{
    path: '', component: DashboardComponent, children: [
        {
            path:'', component: InicioComponent
        }, {
            path:'pedidos', component: PedidosComponent
        }, {
            path:'productos', component: ProductosComponent
        }, {
            path: 'crear-producto', component: CrearProductoComponent
        }, {
            path: 'editar-producto/:id', component: CrearProductoComponent
        }, {
            path: 'crear-pedido', component: CrearPedidosComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }