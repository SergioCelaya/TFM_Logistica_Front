import { pedidoRespuesta } from "./pedidosRespuesta.interface";

export interface allPedidos  {
    TotalElementos:number,
    ElementosPagina:number,
    Pagina:number,
    Resultado: pedidoRespuesta[]
}