import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido/pedido.model';
import { Producto } from 'src/app/models/producto/producto.model';
import { PedidoService } from 'src/app/service/pedido.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-crear-pedidos',
  templateUrl: './crear-pedidos.component.html',
  styleUrls: ['./crear-pedidos.component.css']
})
export class CrearPedidosComponent implements OnInit {

  createPedido: FormGroup;

  productos: Producto[] = [];

  productoNombre: string = '';

  constructor(private fb: FormBuilder, private _productoService: ProductoService, private _snackBar: MatSnackBar, private _pedidoService: PedidoService, private route: Router) {
    this.createPedido = this.fb.group({
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      horario: ['', Validators.required],
      detalle: ['', Validators.required],
      cantidad: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.traerProductos();
  }

  traerProductos() {
    this._productoService.getProductos().subscribe(data => {
      data.forEach((element: Producto) => {
        this.productos.push({
          id: element.id,
          nombre: element.nombre,
          descripcionCorta: element.descripcionCorta,
          descripcionLarga: element.descripcionLarga,
          precioUnitario: element.precioUnitario
        })
      });
    });
  }

  generarDetalle() {
    this.productos.forEach((producto: Producto) => {
      if(producto.nombre === this.createPedido.value.detalle){
        this.productoNombre = producto.id;
      }
    });

  }

  agregarPedido() {
    this.generarDetalle()
    const pedido: Pedido = {
      direccion: this.createPedido.value.direccion,
      email: this.createPedido.value.email,
      telefono: this.createPedido.value.telefono,
      horario: this.createPedido.value.horario,
      detalle: [{
        producto: this.productoNombre,
        cantidad: this.createPedido.value.cantidad
      }]
    }
    this._pedidoService.postPedido(pedido).subscribe(() => {
      this.route.navigate(['/dashboard/pedidos']);
      this._snackBar.open('Pedido agregado con exito', 'Aceptar', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.createPedido.reset();
    }, err => {
      console.error(err);
      this.route.navigate(['/dashboard/pedidos']);
      this._snackBar.open('Error al agregar un pedido', 'Aceptar', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    });   
  }

}
