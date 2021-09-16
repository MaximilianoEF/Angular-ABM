import { ProductoPedSend } from "../producto/productoPedSend.model";

export class PedidoSend {

  public fecha: string;
  public direccion: string;
  public email: string;
  public telefono: string;
  public horario: string;
  public detalle: ProductoPedSend[];
  public total: number;
  public descuento: boolean;
  public estado: string;

  constructor(data?: any) {
    if(data && data.fecha) {
      this.fecha = data.fecha;
      this.direccion = data.direccion;
      this.email = data.email;
      this.telefono = data.telefono;
      this.horario = data.horario;
      this.detalle = data.detalle;
      this.total = data.total;
      this.descuento = data.descuento;
      this.estado = data.estado;
    } else {
      this.fecha = '';
      this.direccion = '';
      this.email = '';
      this.telefono = '';
      this.horario = '';
      this.detalle = [{
        producto: '',
        nombre: '',
        cantidad: 0,
        importe: 0
      }];
      this.total = 0;
      this.descuento = false;
      this.estado = '';
    }
  }

}
