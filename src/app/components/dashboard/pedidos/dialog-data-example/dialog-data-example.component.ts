import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialogData';
import { ProductoPedSend } from 'src/app/models/producto/productoPedSend.model';
import { PedidoService } from 'src/app/service/pedido.service';

@Component({
  selector: 'app-dialog-data-example',
  templateUrl: './dialog-data-example.component.html',
  styleUrls: ['./dialog-data-example.component.css']
})
export class DialogDataExampleComponent implements OnInit {

  detalles: ProductoPedSend[] = [];

  displayedColumns: string[] = ['nombre', 'cantidad'];
  
  dataSource = this.detalles;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public _pedidoService: PedidoService) {
    console.log(this.data);
  }

  ngOnInit(): void {
    this.listarDetalles();
  }

  listarDetalles() {
    this._pedidoService.getPedido(this.data.fecha).subscribe(data => {
      this.detalles = data[this.data.id].detalle;
      this.dataSource = this.detalles;
    });
  }

}

