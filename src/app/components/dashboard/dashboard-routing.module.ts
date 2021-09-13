import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";
import { PedidosComponent } from "./pedidos/pedidos.component";
import { ProductosComponent } from "./productos/productos.component";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [{
    path: '', component: DashboardComponent, children: [
        {
            path:'', component: InicioComponent
        }, {
            path:'pedidos', component: PedidosComponent
        }, {
            path:'productos', component: ProductosComponent
        }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DashboardRoutingModule { }