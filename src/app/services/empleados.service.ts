import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EmpleadoRespuesta } from '../models/Respuestas_API/empleadoRespuesta.interface';
import { PaginacionRespuesta } from '../models/Respuestas_API/paginacionRespuesta.interface';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private baseUrl: string = 'http://localhost:3000/api/empleados';

  constructor(private httpClient: HttpClient) {}

  async getEmpleadosPaginados(pagina: number): Promise<PaginacionRespuesta<EmpleadoRespuesta>> {
    return await firstValueFrom(
      this.httpClient.get<PaginacionRespuesta<EmpleadoRespuesta>>(`${this.baseUrl}/${pagina}`)
    );
  }

  async getEmpleadosByPuestoSinPaginar(puesto: number): Promise<EmpleadoRespuesta[]> {
    return await firstValueFrom(
      this.httpClient.get<EmpleadoRespuesta[]>(`${this.baseUrl}/byPuestoSinPag/${puesto}`)
    );
  }

  async getEmpleadosByPuestoAlmacenSinPaginar(puesto: number, idAlmacen: number): Promise<EmpleadoRespuesta[]> {
    return await firstValueFrom(
      this.httpClient.get<EmpleadoRespuesta[]>(`${this.baseUrl}/byPuestoAlmacenSinPag/${puesto}/${idAlmacen}`)
    );
  }

  async getEmpleadoById(idEmpleado: number): Promise<EmpleadoRespuesta> {
    return await firstValueFrom(
      this.httpClient.get<EmpleadoRespuesta>(`${this.baseUrl}/byId/${idEmpleado}`)
    );
  }

  async createEmpleado(empleadoData: any): Promise<any> {
    return await firstValueFrom(
      this.httpClient.post(`${this.baseUrl}/`, empleadoData)
    );
  }

  async updateEmpleadoEstado(idEmpleado: number, estado: number): Promise<any> {
    return await firstValueFrom(
      this.httpClient.put(`${this.baseUrl}/estado/${idEmpleado}`, { activo: estado })
    );
  }

  async updateEmpleadoAlmacen(idEmpleado: number, idAlmacen: number): Promise<any> {
    return await firstValueFrom(
      this.httpClient.put(`${this.baseUrl}/almacen/${idEmpleado}`, { idalmacen: idAlmacen })
    );
  }

  private empleadoSeleccionadoSource = new BehaviorSubject<EmpleadoRespuesta | null>(null);
  empleadoSeleccionado$ = this.empleadoSeleccionadoSource.asObservable();

  seleccionarEmpleado(empleado: EmpleadoRespuesta) {
    this.empleadoSeleccionadoSource.next(empleado);
  }

  async updateEmpleado(idEmpleado: number, empleadoData: any): Promise<any> {
    return await firstValueFrom(
      this.httpClient.put(`${this.baseUrl}/${idEmpleado}`, empleadoData)

    );
  }
  
  

}
