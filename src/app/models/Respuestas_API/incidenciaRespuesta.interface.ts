import { EmpleadoRespuesta } from "./empleadoRespuesta.interface";

export interface IncidenciaRespuesta{
idincidencia: number;
titulo: string;
descripcion: string;
idpedido_asociado: number;
tipo_incidencia: string;
vista: boolean;
usuario_asignado:EmpleadoRespuesta;
}