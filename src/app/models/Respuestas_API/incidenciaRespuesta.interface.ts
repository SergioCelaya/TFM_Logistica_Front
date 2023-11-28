import { EmpleadoRespuesta } from "./empleadoRespuesta.interface";

export interface IncidenciaRespuesta{
idIncidencia: number;
titulo: string;
descripcion: string;
idpeticion_asociado: number;
tipo_incidencia: string;
vista: boolean;
usuario_asignado:EmpleadoRespuesta;
}