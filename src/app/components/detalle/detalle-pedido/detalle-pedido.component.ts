import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { pedidoRespuesta } from 'src/app/models/Respuestas_API/pedidosRespuesta.interface';
import { Almacen } from 'src/app/models/almacen.interface';
import { AlmacenService } from 'src/app/services/almacen.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css'],
})
export class DetallePedidoComponent {
  pedidoActivo: pedidoRespuesta | undefined;
  pedidosService = inject(PedidosService);
  almacenesService = inject(AlmacenService);
  private unsubscribe = new Subject<void>();
  almacenOrigen: Almacen | undefined;
  almacenDestino: Almacen | undefined;
  claseSegunEstado: any;
  private router = inject(Router);
  nombre: string = '';
  apellidos: string = '';
  almacenVacio:Almacen ={
    activo:false,
    idalmacen:0,
    imagen_almacen:"",
    lat:0,
    long:0,
    nombre_almacen:""
  }
  fehaCreacion:any=null;
  fechaEntrega:any=null;

  ngOnInit() {
    this.pedidosService
      .getPedidoActivo$()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(async (pedido) => {
        if (pedido.idPedido > 0) {
          this.pedidoActivo = pedido;
          this.cambiarEestiloSegunPedido(pedido.estado);
          this.almacenOrigen = await this.almacenesService.getById(
            pedido.almacen_origen
          );
          this.almacenDestino = await this.almacenesService.getById(
            pedido.almacen_destino
          );
          this.nombre = pedido.usuario_responsable.nombre;
          this.apellidos = pedido.usuario_responsable.apellidos;
          this.fehaCreacion = pedido.fecha_creacion;
          this.fechaEntrega = pedido.fecha_entrega;
        } else {
          this.pedidoActivo = pedido;
          this.cambiarEestiloSegunPedido(pedido.estado);
          this.almacenOrigen = this.almacenVacio;
          this.almacenDestino = this.almacenVacio;
          this.nombre="";
          this.apellidos = "";
          this.fehaCreacion=null;
          this.fechaEntrega =null;
        }
      });
  }

  private cambiarEestiloSegunPedido(estado: string) {
    switch (estado) {
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
  toGestionPedido() {
    this.router.navigate(['/gestionPedido/' + this.pedidoActivo?.idPedido]);
  }
}
