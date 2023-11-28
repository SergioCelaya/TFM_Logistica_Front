import { EmpleadoRespuesta } from "./empleadoRespuesta.interface";

export interface pedidoRespuesta {
    idPedido: number;
    numero_pedido: string;
    fecha_creacion: Date;
    almacen_origen: string;
    almacen_destino: string;
    fecha_entrega: Date;
    usuario_asignado: EmpleadoRespuesta;
    usuario_responsable: EmpleadoRespuesta;
    estado: string;
    id_transporte:string;
    detalle_pedido:string;
}