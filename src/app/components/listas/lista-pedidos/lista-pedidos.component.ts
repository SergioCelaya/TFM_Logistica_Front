import { Component, inject } from '@angular/core';
import { allPedidos } from 'src/app/models/Respuestas_API/allPedidos.interface';
import { pedidoRespuesta } from 'src/app/models/Respuestas_API/pedidosRespuesta.interface';
import { Empleado } from 'src/app/models/empleado.interface';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import Swal from 'sweetalert2';

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
  paginaActual: number = 0;
  numeroPaginas: number = 0;
  arrayPaginas = Array(this.numeroPaginas);
  async ngOnInit() {
    try {
      this.respuestaCompleta = await this.pedidosService.getPedidosEmpleado(1);
      this.totalPedidos = this.respuestaCompleta?.TotalElementos!;
      this.pedidosPagina = this.respuestaCompleta?.ElementosPagina!;
      this.paginaActual = 1;
      this.numeroPaginas = Math.ceil(this.totalPedidos / this.pedidosPagina);
      console.log(this.numeroPaginas)
      this.arrayPaginas = Array(this.numeroPaginas);
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

  async irPagina(pagina: number): Promise<void> {
    try {
      this.paginaActual = pagina;
      this.respuestaCompleta = await this.pedidosService.getPedidosEmpleado(pagina);
      this.pedidosEmpleado = this.respuestaCompleta?.Resultado!;
      if (this.pedidosEmpleado.length > 0) {
        this.pedidosService.setPedidoActivo(this.pedidosEmpleado[0]);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title:
          'Error al obtener los pedidos. Consulte con el administrador.',
      });
    }
  }

  irAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual -= 1;
      this.irPagina(this.paginaActual);
    }
  }
  irSiguiente() {
    if (this.paginaActual < this.numeroPaginas) {
      this.paginaActual += 1;
      this.irPagina(this.paginaActual);
    }
  }

}
