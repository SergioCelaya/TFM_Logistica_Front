import { Component, Input, inject } from '@angular/core';
import { pedidoRespuesta } from 'src/app/models/Respuestas_API/pedidosRespuesta.interface';
import { Almacen } from 'src/app/models/almacen.interface';
import { AlmacenService } from 'src/app/services/almacen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent {

  claseSegunEstado: any;
  @Input() pedido: pedidoRespuesta | null = null;
  almacenOrigen: Almacen | null = null;
  almacenDestino: Almacen | null = null;
  private infoPedido: pedidoRespuesta | null = null;
  private almacenesService = inject(AlmacenService);
  hayIncidencia: any = true;
  verIncidencia:any;

  async ngOnInit() {
    if (this.pedido?.almacen_origen && this.pedido?.almacen_destino) {
      try{
      this.almacenOrigen = await this.almacenesService.getById(
        this.pedido?.almacen_origen
      );
      this.almacenDestino = await this.almacenesService.getById(
        this.pedido?.almacen_destino
      );
      }catch(Error){
        Swal.fire({
          icon: 'error',
          title:
            'Error al obtener los almacenes. Consulte con el administrador.',
        });
      }
    }
    switch (this.pedido?.estado) {
      case 'Pendiente validar':
        this.claseSegunEstado = { pendienteValidar: true };
        break;
      case 'Rectificar':
        this.claseSegunEstado = { rectifiar: true };
        break;
      case 'Validado':
        this.claseSegunEstado = { validado: true };
        break;
      case 'En tránsito':
        this.claseSegunEstado = { transito: true };
        break;
      case 'Pendiente recepcionar':
        this.claseSegunEstado = { pendienteRecepcion: true };
        break;
      case 'Finalizado':
        this.claseSegunEstado = { finalizado: true };
        break;
      default:
        this.claseSegunEstado = { sinEstado: true };
        break;
    }
  }

  incidencia(ver:boolean) {
    console.log("recibido")
    this.verIncidencia = !this.verIncidencia;
    }
}
