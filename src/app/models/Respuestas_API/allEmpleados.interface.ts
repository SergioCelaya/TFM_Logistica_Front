import { EmpleadoRespuesta } from "./empleadoRespuesta.interface";

export interface allEmpleados{
    TotalElementos:number,
    ElementosPagina:number,
    Pagina:number,
    Resultado: EmpleadoRespuesta[]
}