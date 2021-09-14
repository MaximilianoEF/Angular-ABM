import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/models/producto/producto.model';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  
  productos: Producto[] = [];

  displayedColumns: string[] = ['id', 'nombre', 'descripcionCorta', 'descripcionLarga', 'precioUnitario', 'acciones'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _productoService: ProductoService, private _snackBar: MatSnackBar) {
    
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarProductos() {
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
    this.dataSource = new MatTableDataSource(this.productos);
  }

  eliminar(id: string){
    if(id !== null){
      this._productoService.deleteProducto(id).subscribe(() => {
        this.productos = [];
        this.cargarProductos();
        this._snackBar.open('Producto eliminado con exito', 'Aceptar', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }, err => {
        console.error(err);
        this._snackBar.open('Error al eliminar el producto', 'Aceptar', {
          duration: 1500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      });
    }
  }

}
