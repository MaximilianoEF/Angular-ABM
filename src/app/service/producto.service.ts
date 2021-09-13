import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private API_SERVER = 'http://localhost:8080/productos/'

  constructor(private http: HttpClient) { }

  public getProducto(id: string): Observable<any> {
    return this.http.get(this.API_SERVER+id);
  }

  public getProductos(): Observable<any> {
    return this.http.get(this.API_SERVER);
  }

  public postProducto(producto: Producto): Observable<any> {
    return this.http.post(this.API_SERVER, producto);
  }

  public putProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put(this.API_SERVER+id, producto);
  }

  public deleteProducto(id: string): Observable<any> {
    return this.http.delete(this.API_SERVER+id);
  }

}
