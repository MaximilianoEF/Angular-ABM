import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto/producto.model';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  createProducto: FormGroup;
  
  productos: Producto[] = [];

  isEditar: boolean = false;

  constructor(private fb: FormBuilder, private productoService: ProductoService) {
    this.createProducto = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcionCorta: ['', Validators.required],
      descripcionLarga: ['', Validators.required],
      precioUnitario: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.mostrarProductos();
  }

  mostrarProductos() {
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

  agregarProducto() {
    const producto: Producto = {
      id: this.createProducto.value.id,
      nombre: this.createProducto.value.nombre,
      descripcionCorta: this.createProducto.value.descripcionCorta,
      descripcionLarga: this.createProducto.value.descripcionLarga,
      precioUnitario: this.createProducto.value.precioUnitario
    }
    this.productoService.postProducto(producto).subscribe(() => {
      console.log('Producto creado!');
      this.createProducto.setValue({
          id: '',
          nombre: '',
          descripcionCorta: '',
          descripcionLarga: '',
          precioUnitario: ''
      });
      this.productos = [];
      this.mostrarProductos();
    }, err => {console.error(err);});   
  }

  editar(id: string) {
    if(id !== null) {
      this.productoService.getProducto(id).subscribe(data => {
        this.createProducto.setValue({
          id: data.id,
          nombre: data.nombre,
          descripcionCorta: data.descripcionCorta,
          descripcionLarga: data.descripcionLarga,
          precioUnitario: data.precioUnitario
        })
      });
      this.isEditar = true;
    }
  }

  agregarEditProducto() {
    const producto: Producto = {
      id: this.createProducto.value.id,
      nombre: this.createProducto.value.nombre,
      descripcionCorta: this.createProducto.value.descripcionCorta,
      descripcionLarga: this.createProducto.value.descripcionLarga,
      precioUnitario: this.createProducto.value.precioUnitario
    }
    this.productoService.putProducto(this.createProducto.value.id, producto).subscribe(() => {
      console.log('Producto modificado!');
      this.createProducto.setValue({
          id: '',
          nombre: '',
          descripcionCorta: '',
          descripcionLarga: '',
          precioUnitario: ''
      });
      this.isEditar = false;
      this.productos = [];
      this.mostrarProductos();
    }, err => {console.error(err);}); 
  }

  eliminar(id: string){
    if(id !== null){
      this.productoService.deleteProducto(id).subscribe(() => {
        console.log('Producto eliminado!');
        this.productos = [];
        this.mostrarProductos();
      }, err => {
        console.error(err);
        alert(err.message);
      });
    }
  }

}
