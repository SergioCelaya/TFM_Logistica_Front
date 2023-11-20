export interface Pedido {

    idPedido: number;
    numPedido: string;
    fechaCreacion: Date;
    almacenOrigen: string;
    almacenDestino: string;
    fechaEntrega: Date;
    usuarioAsignado: string;
    usuarioResponsable: string;
    estado: string;

}
