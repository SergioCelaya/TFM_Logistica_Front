import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Empleado } from '../models/empleado.interface';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  firstValueFrom,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { allPedidos } from '../models/Respuestas_API/allPedidos.interface';
import { pedidoRespuesta } from '../models/Respuestas_API/pedidosRespuesta.interface';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private pedidoActivo: ReplaySubject<pedidoRespuesta> =
    new ReplaySubject<pedidoRespuesta>(1);

  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:3000/api/pedidos/';
  private urlByEmpleado: string = 'byEmpleadoId/';

  getPedidoActivo$(): Observable<pedidoRespuesta> {
    return this.pedidoActivo.asObservable();
  }

  setPedidoActivo(pedido:pedidoRespuesta):void{
    this.pedidoActivo.next(pedido);
  }

  async getPedidosEmpleado(pagina: number) {
    const empleado: Empleado | null = await this.authService.getUser();
    if (empleado) {
      console.log(this.baseUrl + this.urlByEmpleado + '1/1');
      const respuesta = await firstValueFrom(
        this.httpClient.get<allPedidos>(
          this.baseUrl + this.urlByEmpleado + empleado.idempleado + '/' + pagina
        )
      );
      return respuesta;
    }
    return null;
  }

  constructor() {}
}
