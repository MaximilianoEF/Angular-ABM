export class Producto {
    public id: string;
    public nombre: string;
    public descripcionCorta: string;
    public descripcionLarga: string;
    public precioUnitario: number;

    constructor(data?: any) {
        if(data && data.id) {
            this.id = data.id;
            this.nombre = data.nombre;
            this.descripcionCorta = data.descripcionCorta;
            this.descripcionLarga = data.descripcionLarga;
            this.precioUnitario = data.precioUnitario; 
        } else {
            this.id = '';
            this.nombre = '';
            this.descripcionCorta = '';
            this.descripcionLarga = '';
            this.precioUnitario = 0;
        }
    }

}