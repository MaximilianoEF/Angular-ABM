import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/models/pedido/pedido.model';
import { PedidoSend } from 'src/app/models/pedido/pedidoSend.model';
import { Producto } from 'src/app/models/producto/producto.model';
import { PedidoService } from 'src/app/service/pedido.service';
import { ProductoService } from 'src/app/service/producto.service';
import { DialogDataExampleComponent } from './dialog-data-example/dialog-data-example.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {  

  displayedColumns: string[] = ['direccion', 'email', 'telefono', 'horario', 'detalle', 'total', 'estado'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  fecha: FormGroup;
  
  pedidos: PedidoSend[] = [];

  constructor(private fb: FormBuilder, private _pedidoService: PedidoService, public _dialog: MatDialog) {
    this.fecha = this.fb.group({
      fecha: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.pedidos);
  }

  openDialog(id: number) {
    this._dialog.open(DialogDataExampleComponent, {
      data: {
        id: id,
        fecha: this.fecha.value.fecha
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  listarPedidos() {
    this.pedidos = [];
    this._pedidoService.getPedido(this.fecha.value.fecha).subscribe(data => {
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
    });
    this.dataSource = new MatTableDataSource(this.pedidos);
    this.ngAfterViewInit();
  }

}
