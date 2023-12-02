import { Component, inject } from '@angular/core';
import { allPedidos } from 'src/app/models/Respuestas_API/allPedidos.interface';
import { pedidoRespuesta } from 'src/app/models/Respuestas_API/pedidosRespuesta.interface';
import { Empleado } from 'src/app/models/empleado.interface';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css'],
})
export class ListaPedidosComponent {
  pedidosEmpleado: pedidoRespuesta[] | null = [];
  respuestaCompleta: allPedidos | null = null;
  pedidosService = inject(PedidosService);
  authService = inject(AuthService);
  empleado: Empleado | null = null;
  private totalPedidos: number = 0;
  private pedidosPagina: number = 0;
  private paginaActual: number = 0;
  private numeroPaginas: number = 0;

  async ngOnInit() {
    try {
      this.respuestaCompleta = await this.pedidosService.getPedidosEmpleado(1);
      this.totalPedidos = this.respuestaCompleta?.TotalElementos!;
      this.pedidosPagina = this.respuestaCompleta?.ElementosPagina!;
      this.paginaActual = 1;
      this.numeroPaginas = this.totalPedidos / this.pedidosPagina;
      console.log(this.respuestaCompleta);
      this.pedidosEmpleado = this.respuestaCompleta?.Resultado!;
      if (this.pedidosEmpleado.length > 0) {
        this.pedidosService.setPedidoActivo(this.pedidosEmpleado[0]);
      }
    } catch (error) {
      //TODO
      console.log(error);
    }
  }

  cargarPedido(pedido: pedidoRespuesta) {
    this.pedidosService.setPedidoActivo(pedido);
  }
}
