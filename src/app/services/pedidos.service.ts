import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Empleado } from '../models/empleado.interface';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { allPedidos } from '../models/Respuestas_API/allPedidos.interface';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:3000/api/pedidos/';
  private urlByEmpleado:string = 'byEmpleadoId/';

  async getPedidosEmpleado() {
    const empleado: Empleado | null = await this.authService.getUser();
    if (empleado) {
      const respuesta = await firstValueFrom(
       this.httpClient.get<allPedidos>(this.baseUrl + this.urlByEmpleado + empleado.idEmpleado)
      );
    }
    return null;
  }

  constructor() {}
}
