import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto/producto.model';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  createProducto: FormGroup;

  id: string | null;

  titulo = "Agregar Producto";

  constructor(private fb: FormBuilder, private _productoService: ProductoService, private _snackBar: MatSnackBar, private route: Router, private aRoute: ActivatedRoute) {
    this.createProducto = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcionCorta: ['', Validators.required],
      descripcionLarga: ['', Validators.required],
      precioUnitario: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if(this.id !== null){
      this.esEditar();
    }
  }

  agregar() {
    if(this.createProducto.invalid){
      return;
    }
    if(this.id === null) {
      this.agregarProducto();
    } else {
      this.editar(this.id);
    }
  }

  agregarProducto() {
    const producto: Producto = {
      id: this.createProducto.value.id,
      nombre: this.createProducto.value.nombre,
      descripcionCorta: this.createProducto.value.descripcionCorta,
      descripcionLarga: this.createProducto.value.descripcionLarga,
      precioUnitario: this.createProducto.value.precioUnitario
    }
    this._productoService.postProducto(producto).subscribe(() => {
      this.route.navigate(['/dashboard/productos']);
      this._snackBar.open('Producto creado con exito', 'Aceptar', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }, err => {
      console.error(err);
      this._snackBar.open('Error al crear producto', 'Aceptar', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    });   
  }

  esEditar() {
    this.titulo = "Editar Producto"
    if(this.id !== null) {
      this._productoService.getProducto(this.id).subscribe(data => {
        this.createProducto.setValue({
          id: data.id,
          nombre: data.nombre,
          descripcionCorta: data.descripcionCorta,
          descripcionLarga: data.descripcionLarga,
          precioUnitario: data.precioUnitario
        })
      });
    }
  }

  editar(id: string) {
    const producto: Producto = {
      id: this.createProducto.value.id,
      nombre: this.createProducto.value.nombre,
      descripcionCorta: this.createProducto.value.descripcionCorta,
      descripcionLarga: this.createProducto.value.descripcionLarga,
      precioUnitario: this.createProducto.value.precioUnitario
    }
    this._productoService.putProducto(id, producto).subscribe(() => {
      this.route.navigate(['/dashboard/productos']);
      this._snackBar.open('Usuario editado con exito', 'Aceptar', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }, err => {
      console.error(err);
      this._snackBar.open('Error al editar el producto', 'Aceptar', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }); 
  }

}
