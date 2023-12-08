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
import { Pedido } from '../models/pedido.interface';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private pedidoActivo: ReplaySubject<pedidoRespuesta> =
    new ReplaySubject<pedidoRespuesta>(1);

  private authService = inject(AuthService);
  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:3000/api/pedidos';
  private urlByEmpleado: string = 'byEmpleadoId';
  private urlById: string = 'byId';
  private toFin:string = "toFinalizado";
  private toPteRecepcionar:string = "toPendienteRecepcionar";
  private toTrans:string = "toEnTransito";
  private toVal:string = "toValidado";
  private toRect:string = "toRectificar";
  private toPteVal:string = "toPendienteValidar";
  private encargadoByAlmacen: string = 'deEncargadoByAlmacen';
  private byEmpleadoEstado:string= 'byEmpleadoEstado';

  getPedidoActivo$(): Observable<pedidoRespuesta> {
    return this.pedidoActivo.asObservable();
  }

  setPedidoActivo(pedido: pedidoRespuesta): void {
    this.pedidoActivo.next(pedido);
  }

  async getPedidosEmpleado(
    pagina: number,
    idEmpleado: number
  ): Promise<allPedidos> {
    return await firstValueFrom(
      this.httpClient.get<allPedidos>(
        `${this.baseUrl}/${this.urlByEmpleado}/${idEmpleado}/${pagina}`
      )
    );
  }

  async getPedidosEncargadoByAlmacen(pagina: number,idalmacen: number,idEmpleado:number ) {
    return await firstValueFrom(
      this.httpClient.get<allPedidos>(
        `${this.baseUrl}/${this.encargadoByAlmacen}/${idalmacen}/${idEmpleado}/${pagina}`
      )
    );
  }

  async getPedidoById(idpedido: number): Promise<pedidoRespuesta[]> {
    return await firstValueFrom(
      this.httpClient.get<pedidoRespuesta[]>(
        `${this.baseUrl}/${this.urlById}/${idpedido}}`
      )
    );
  }

  async getPedidoByIdEmpleadoEstado(usuario: number,estado:number,pagina:number): Promise<allPedidos> {
    return await firstValueFrom(
      this.httpClient.get<allPedidos>(
        `${this.baseUrl}/${this.byEmpleadoEstado}/${usuario}/${estado}/${pagina}`
      )
    );
  }

  async createPedido(pedido: Pedido): Promise<Pedido> {
    return await firstValueFrom(
      this.httpClient.post<Pedido>(`${this.baseUrl}/`, pedido)
    );
  }

  async updatePedido(pedido: Pedido) {
    return await firstValueFrom(
      this.httpClient.put<Pedido>(`${this.baseUrl}/${pedido.idPedido}`, pedido)
    );
  }

async toPendientevalidar(idPedido:number){
  return await firstValueFrom(
    this.httpClient.put<Pedido>(`${this.baseUrl}/${this.toPteVal}/${idPedido}`,null)
  );
}

async toRectificar(idPedido:number){
  return await firstValueFrom(
    this.httpClient.put<Pedido>(`${this.baseUrl}/${this.toRect}/${idPedido}`,null)
  );
}

async toValidado(idPedido:number){
  return await firstValueFrom(
    this.httpClient.put<Pedido>(`${this.baseUrl}/${this.toVal}/${idPedido}`,null)
  );
}

async toEnTransito(idPedido:number){
  return await firstValueFrom(
    this.httpClient.put<Pedido>(`${this.baseUrl}/${this.toTrans}/${idPedido}`,null)
  );
}
async toPendienteRecepcionar(idPedido:number){
  return await firstValueFrom(
    this.httpClient.put<Pedido>(`${this.baseUrl}/${this.toPteRecepcionar}/${idPedido}`,null)
  );
}

async toFinalizado(idPedido:number){
  return await firstValueFrom(
    this.httpClient.put<Pedido>(`${this.baseUrl}/${this.toFin}/${idPedido}`,null)
  );
}
  constructor() {}
}
