import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { allPedidos } from 'src/app/models/Respuestas_API/allPedidos.interface';
import { EmpleadoRespuesta } from 'src/app/models/Respuestas_API/empleadoRespuesta.interface';
import { pedidoRespuesta } from 'src/app/models/Respuestas_API/pedidosRespuesta.interface';
import { Empleado } from 'src/app/models/empleado.interface';
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
  private router = inject(Router);
  empleado: Empleado | null = null;
  private totalPedidos: number = 0;
  private pedidosPagina: number = 0;
  paginaActual: number = 0;
  numeroPaginas: number = 0;
  arrayPaginas = Array(this.numeroPaginas);
  esEmpleado: boolean = true;
  estadoFitro: number = 0;
  numPedido: any;
  aplicarFiltro: boolean = false;
  empleadoVacio: EmpleadoRespuesta = {
    activo: 0,
    apellidos: '',
    email: '',
    fecha_contratacion: new Date(),
    idalmacen: 0,
    idempleado: 0,
    imagen_empleado: '',
    nombre: '',
    num_empleado: '',
    puesto: 0,
    pwd: '',
  };

  async ngOnInit() {
    this.cargarListadoInicial();
  }

  async cargarListadoInicial() {
    try {
      this.empleado = await this.authService.getUser();
      if (this.empleado.activo) {
        if (this.empleado.puesto == 'Empleado') {
          this.respuestaCompleta = await this.pedidosService.getPedidosEmpleado(
            1,
            this.empleado.idempleado
          );
        } else if (this.empleado.puesto == 'Encargado') {
          this.esEmpleado = false;
          this.respuestaCompleta =
            await this.pedidosService.getPedidosEncargadoByAlmacen(
              1,
              this.empleado.idalmacen,
              this.empleado.idempleado
            );
          console.log(this.respuestaCompleta);
        }
        if (this.respuestaCompleta) {
          this.paginado(this.respuestaCompleta);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener los pedidos. Consulte con el administrador.',
      });
    }
  }

  cargarPedido(pedido: pedidoRespuesta) {
    console.log("PedidoActvo")
    console.log(pedido)
    this.pedidosService.setPedidoActivo(pedido);
  }

  async irPagina(pagina: number): Promise<void> {
    try {
      this.paginaActual = pagina;
      if (this.estadoFitro == 0) {
        if (this.empleado) {
          if (this.empleado.puesto == 'Empleado') {
            try {
              this.respuestaCompleta =
                await this.pedidosService.getPedidosEmpleado(
                  pagina,
                  this.empleado.idempleado
                );
            } catch (error) {
              Swal.fire({
                icon: 'error',
                title:
                  'Error al cargar el pedido. Consulte con el administrador.',
              });
            }
          } else if (this.empleado.puesto == 'Encargado') {
            try {
              this.respuestaCompleta =
                await this.pedidosService.getPedidosEncargadoByAlmacen(
                  pagina,
                  this.empleado.idalmacen,
                  this.empleado.idempleado
                );
            } catch (error) {
              Swal.fire({
                icon: 'error',
                title:
                  'Error al cargar el pedido. Consulte con el administrador.',
              });
            }
          }
          this.pedidosEmpleado = this.respuestaCompleta?.Resultado!;
          if (this.pedidosEmpleado.length > 0) {
            this.pedidosService.setPedidoActivo(this.pedidosEmpleado[0]);
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar el pedido. Consulte con el administrador.',
          });
        }
      } else {
        this.filtroEstado(this.estadoFitro, pagina);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener los pedidos. Consulte con el administrador.',
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

  crearPedido() {
    this.router.navigate(['/gestionPedido']);
  }

  paginado(pedidos: allPedidos) {
    this.totalPedidos = this.respuestaCompleta?.TotalElementos!;
    this.pedidosPagina = this.respuestaCompleta?.ElementosPagina!;
    this.paginaActual = 1;
    this.numeroPaginas = Math.ceil(this.totalPedidos / this.pedidosPagina);
    this.arrayPaginas = Array(this.numeroPaginas);
    this.pedidosEmpleado = this.respuestaCompleta?.Resultado!;
    console.log('Pedidos empleado');
    console.log(this.pedidosEmpleado);
    if (this.pedidosEmpleado.length > 0) {
      this.pedidosService.setPedidoActivo(this.pedidosEmpleado[0]);
    } else {
      const pedidoVacio: pedidoRespuesta = {
        almacen_destino: 0,
        almacen_origen: 0,
        detalle_pedido: '',
        estado: '',
        fecha_creacion: new Date(),
        fecha_entrega: new Date(),
        id_transporte: '',
        idPedido: 0,
        numero_pedido: '',
        usuario_asignado: this.empleadoVacio,
        usuario_responsable: this.empleadoVacio,
      };
      this.pedidosService.setPedidoActivo(pedidoVacio);
    }
  }
  mostrarTodos() {
    this.numPedido = '';
    this.cargarListadoInicial();
  }

  cargarSiVacio() {
    if (this.numPedido == '') {
      this.cargarListadoInicial();
    }
  }

  async buscarPedidoId() {
    let pedido: any = null;
    try {
      pedido = await this.pedidosService.getPedidoByNumPedido(
        this.numPedido.toString()
      );
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title:
          'Error al cargar la lista de pedidos. Consulte con el administrador.',
      });
    }
    if (pedido.fatal) {
      Swal.fire({
        icon: 'error',
        title:
          'Error al cargar la lista de pedidos. Consulte con el administrador.',
      });
    } else if (pedido.idPedido) {
      this.pedidosEmpleado = [];
      this.pedidosEmpleado?.push(pedido);
      if (this.pedidosEmpleado && this.pedidosEmpleado.length > 0) {
        this.pedidosService.setPedidoActivo(this.pedidosEmpleado[0]);
        this.totalPedidos = 1;
        this.numeroPaginas = 1;
        this.paginaActual = 1;
        this.arrayPaginas = Array(1);
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'No existe pedido con ese identificador.',
      });
    }
  }

  borrarfiltro() {
    this.aplicarFiltro = false;
    this.estadoFitro = 0;
    this.cargarListadoInicial();
  }

  async filtroEstado(estado: number, pagina: number) {
    this.aplicarFiltro = true;
    if (this.empleado?.idempleado) {
      this.estadoFitro = estado;
      if (this.esEmpleado) {
        try {
          this.respuestaCompleta =
            await this.pedidosService.getPedidoByIdEmpleadoEstado(
              this.empleado?.idempleado,
              estado,
              pagina
            );
        } catch (Error) {
          Swal.fire({
            icon: 'error',
            title:
              'Error al cargar la lista de pedidos. Consulte con el administrador.',
          });
        }
      } else {
        if (estado == 1) {
          try {
            this.respuestaCompleta =
              await this.pedidosService.getPedidosEncargadoByAlmacenValidar(
                pagina,
                this.empleado.idalmacen,
                this.empleado.idempleado
              );
          } catch (Error) {
            Swal.fire({
              icon: 'error',
              title:
                'Error al cargar la lista de pedidos. Consulte con el administrador.',
            });
          }
        } else {
          try {
            this.respuestaCompleta =
              await this.pedidosService.getPedidosEncargadoByAlmacenRecepcionar(
                pagina,
                this.empleado.idalmacen
              );
          } catch (Error) {
            Swal.fire({
              icon: 'error',
              title:
                'Error al cargar la lista de pedidos. Consulte con el administrador.',
            });
          }
        }
      }
      if (this.respuestaCompleta) {
        this.paginado(this.respuestaCompleta);
      } else {
        Swal.fire({
          icon: 'error',
          title:
            'Error al cargar la lista de pedidos. Consulte con el administrador.',
        });
      }
    }
  }
}
