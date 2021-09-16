import { ProductoPed } from "../producto/productoPed.model";

export class Pedido {

  public direccion: string;
  public email: string;
  public telefono: string;
  public horario: string;
  public detalle: ProductoPed[];

  constructor(data?: any) {
    if(data && data.fecha) {
      this.direccion = data.direccion;
      this.email = data.email;
      this.telefono = data.telefono;
      this.horario = data.horario;
      this.detalle = data.detalle;
    } else {
      this.direccion = '';
      this.email = '';
      this.telefono = '';
      this.horario = '';
      this.detalle = [{
        producto: '',
        cantidad: 0
      }];
    }
  }
}