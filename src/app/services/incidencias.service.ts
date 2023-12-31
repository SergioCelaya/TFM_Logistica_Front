import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable,firstValueFrom,lastValueFrom, tap } from 'rxjs';
import { Incidencia } from '../models/incidencia.interface';
import { allIncidencia } from '../models/Respuestas_API/allIncidencias.interface';
import { IncidenciaRespuesta } from '../models/Respuestas_API/incidenciaRespuesta.interface';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:3000/api/incidencias';
  private urlVista:string = this.baseUrl + `/vista`;
  private urlNoVista:string = this.baseUrl + `/noVista`;
  private byIdPedido:string = this.baseUrl + `/byIdPedido`;
  private byNumPedido:string = this.baseUrl + `/byNumPedido`;
  private byId: string = this.baseUrl + `/byId`;
  private byIdEmpleado:string="/usuario";
  private byAlmacen:string="/byAlmacen";

  // Devuelve todos las incidencias en la BBDD
  getAll(pagina:number): Promise<allIncidencia> {
    return lastValueFrom(this.httpClient.get<allIncidencia>(this.baseUrl+"/"+ pagina));
  }

  getAllEmpleado(idEmpleado:number,pagina:number): Promise<allIncidencia> {
    return lastValueFrom(this.httpClient.get<allIncidencia>(`${this.baseUrl}/${this.byIdEmpleado}/${idEmpleado}/${pagina}`));
  }
  getAllAlmacen(idAlmacen:number,pagina:number):Promise<allIncidencia>{
    return lastValueFrom(this.httpClient.get<allIncidencia>(`${this.baseUrl}/${this.byAlmacen}/${idAlmacen}/${pagina}`));
  }

  // METODO PARA CREAR INCIDENCIA 
  create(incidenciaForm: Incidencia): Promise<Incidencia> {
    return lastValueFrom(this.httpClient.post<Incidencia>(this.baseUrl, incidenciaForm))
  }
 // METODO PARA EDITAR INCIDENCIA 
  updateIncidencia(incidenciaForm: Incidencia): Promise<Incidencia> {
    return lastValueFrom(this.httpClient.put<Incidencia>(`${this.baseUrl}/${incidenciaForm.idincidencia}`, incidenciaForm))
  }

  //METODO PARA CAMBIAR INCIDENCIA A VISTO
  updateIncidenciaToVista(idIncidencia: number): Promise<number> {
    return lastValueFrom(this.httpClient.put<number>(`${this.urlVista}/${idIncidencia}`, null))
  }

  //METODO PARA CAMBIAR INCIDENCIA A NO VISTO
  updateIncidenciaToNoVista(idIncidencia: number): Promise<boolean> {
    return lastValueFrom(this.httpClient.put<boolean>(`${this.urlNoVista}/${idIncidencia}`, null))
  }

  //METODO PARA OBTENER INCIDENCIAS DE UN PEDIDO
  getIncidenciaByIdPedido(idPedido:number):Promise<Incidencia[]>{
    return firstValueFrom(this.httpClient.get<Incidencia[]>(`${this.byIdPedido}/${idPedido}`))
  }
  getIncidenciaByNumPedido(numPedido:string):Promise<Incidencia[]>{
    return firstValueFrom(this.httpClient.get<Incidencia[]>(`${this.byNumPedido}/${numPedido}`))
  }

  // Obtener una incidencia por su ID
  getById(idIncidencia: number): Promise<Incidencia> {
    return lastValueFrom(this.httpClient.get<Incidencia>(`${this.byId}/${idIncidencia}`));
  }

  getByIdConNumPedido(idIncidencia:number):Promise<any>{
    return firstValueFrom(this.httpClient.get<Incidencia>(`${this.byId}/${idIncidencia}`));
  }


  //mostrar detalle de incidencia
  private incidenciaSeleccionadaSource = new BehaviorSubject<IncidenciaRespuesta | null>(null);
  incidenciaSeleccionada$ = this.incidenciaSeleccionadaSource.asObservable();

  seleccionarIncidencia(incidencia: IncidenciaRespuesta) {
    this.incidenciaSeleccionadaSource.next(incidencia);
  }
}
