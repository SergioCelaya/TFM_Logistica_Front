import { IncidenciaRespuesta } from "./incidenciaRespuesta.interface";


export interface allIncidencia {
    TotalElementos:number,
    ElementosPagina:number,
    Pagina:number,
    Resultado: IncidenciaRespuesta[]
}