export class ProductoPedSend {

    public producto: string;
    public nombre: string;
    public cantidad: number;
    public importe: number;

    constructor(data?: any){
        if(data && data.producto){
            this.producto = data.producto;
            this.nombre = data.nombre;
            this.cantidad = data.cantidad;
            this.importe = data.importe;
        } else {
            this.producto = '';
            this.nombre = '';
            this.cantidad = 0;
            this.importe = 0;
        }
    }

}