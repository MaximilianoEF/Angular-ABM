import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  
  private API_SERVER = 'http://localhost:8080/pedidos'

  constructor(private http: HttpClient) { }

  public getPedido(id: string): Observable<any> {
    return this.http.get(this.API_SERVER + "?fecha=" + id);
  }

  public postPedido(pedido: Pedido): Observable<any> {
    return this.http.post(this.API_SERVER, pedido);
  }

}
