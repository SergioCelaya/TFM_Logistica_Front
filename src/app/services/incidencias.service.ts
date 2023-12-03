import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable,lastValueFrom, tap } from 'rxjs';
import { Incidencia } from '../models/incidencia.interface';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:3000/api/incidencias';
  private urlVista:string = this.baseUrl + `/vista`;
  private urlNoVista:string = this.baseUrl + `/noVista`;

  
  // METODO PARA CREAR INCIDENCIA 

  create(incidenciaForm: Incidencia): Promise<Incidencia> {
    return lastValueFrom(this.httpClient.post<Incidencia>(this.baseUrl, incidenciaForm))
  }
 // METODO PARA EDITAR INCIDENCIA 
  updateIncidencia(incidenciaForm: Incidencia): Promise<Incidencia> {
    return lastValueFrom(this.httpClient.put<Incidencia>(`${this.baseUrl}/${incidenciaForm.idIncidencia}`, incidenciaForm))
  }

  //METODO PARA CAMBIAR INCIDENCIA A VISTO
  updateIncidenciaToVista(incidenciaForm: Incidencia): Promise<Incidencia> {
    return lastValueFrom(this.httpClient.put<Incidencia>(`${this.urlVista}/${incidenciaForm.idIncidencia}`, incidenciaForm))
  }

  //METODO PARA CAMBIAR INCIDENCIA A NO VISTO
  updateIncidenciaToNoVista(incidenciaForm: Incidencia): Promise<Incidencia> {
    return lastValueFrom(this.httpClient.put<Incidencia>(`${this.urlNoVista}/${incidenciaForm.idIncidencia}`, incidenciaForm))
  }


}
