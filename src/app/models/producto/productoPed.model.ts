export class ProductoPed {

    public producto: string;
    public cantidad: number;

    constructor(data?: any){
        if(data && data.producto){
            this.producto = data.producto;
            this.cantidad = data.cantidad;
        } else {
            this.producto = '';
            this.cantidad = 0;
        }
    }

}