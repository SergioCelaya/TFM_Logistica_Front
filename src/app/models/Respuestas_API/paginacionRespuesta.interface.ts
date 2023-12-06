export interface PaginacionRespuesta<T> {
    TotalElementos: number;
    ElementosPagina: number;
    Pagina: number;
    Resultado: T[];
  }