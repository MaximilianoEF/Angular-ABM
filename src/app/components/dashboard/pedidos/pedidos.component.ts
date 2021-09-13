import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pedido } from 'src/app/models/pedido/pedido.model';
import { PedidoSend } from 'src/app/models/pedido/pedidoSend.model';
import { Producto } from 'src/app/models/producto/producto.model';
import { PedidoService } from 'src/app/service/pedido.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  createPedido: FormGroup;

  fecha: FormGroup;
  
  pedidos: PedidoSend[] = [];

  productos: Producto[] = [];

  productoNombre: string = '';

  constructor(private fb: FormBuilder, private productoService: ProductoService, private pedidoService: PedidoService) {
    this.createPedido = this.fb.group({
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      horario: ['', Validators.required],
      detalle: ['', Validators.required],
      cantidad: ['', Validators.required]
    });
    this.fecha = this.fb.group({
      fecha: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.traerProductos();
  }

  traerProductos() {
    this.productoService.getProductos().subscribe(data => {
      data.forEach((element: Producto) => {
        this.productos.push({
          id: element.id,
          nombre: element.nombre,
          descripcionCorta: element.descripcionCorta,
          descripcionLarga: element.descripcionLarga,
          precioUnitario: element.precioUnitario
        })
      });
    })
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
    this.pedidoService.postPedido(pedido).subscribe(() => {
      console.log('Pedido creado!');
      this.createPedido.setValue({
          direccion: '',
          email: '',
          telefono: '',
          horario: '',
          detalle: 'Detalle',
          cantidad: 0
      });
      this.pedidos = [];
      this.listarPedidos();
    }, err => {console.error(err);});   
  }

  listarPedidos() {
    this.pedidoService.getPedido(this.fecha.value.fecha).subscribe(data => {
      data.forEach((element: PedidoSend) => {
        this.pedidos.push({
          fecha: element.fecha,
          direccion: element.direccion,
          email: element.email,
          telefono: element.telefono,
          horario: element.horario,
          detalle: element.detalle,
          total: element.total,
          descuento: element.descuento,
          estado: element.estado
        })
      });
      console.log(this.pedidos);
    });
  }

}
