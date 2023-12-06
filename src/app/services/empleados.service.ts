import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EmpleadoRespuesta } from '../models/Respuestas_API/empleadoRespuesta.interface';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:3000/api/empleados';
  private byPuesto = 'byPuestoSinPag';
  private byPuestoAlmacen = 'byPuestoAlmacenSinPag';
  private byIdEmpleado = 'byId';

  async getEmpleadosByPuestoSinPaginar(
    puesto: number
  ): Promise<EmpleadoRespuesta[]> {
    return await firstValueFrom(
      this.httpClient.get<EmpleadoRespuesta[]>(
        `${this.baseUrl}/${this.byPuesto}/${puesto}`
      )
    );
  }
  async getEmpleadosByPuestoAlmacenSinPaginar(
    puesto: number,idAlmacen:number
  ): Promise<EmpleadoRespuesta[]> {
    return await firstValueFrom(
      this.httpClient.get<EmpleadoRespuesta[]>(
        `${this.baseUrl}/${this.byPuestoAlmacen}/${puesto}/${idAlmacen}`
      )
    );
  }
  async getEmpleadoById(idEmpleado: number) {
    return await firstValueFrom(
      this.httpClient.get<EmpleadoRespuesta>(
        `${this.baseUrl}/${this.byIdEmpleado}/${idEmpleado}`
      )
    );
  }

  constructor() {}
}
