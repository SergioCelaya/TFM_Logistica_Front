import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { pedidoRespuesta } from 'src/app/models/Respuestas_API/pedidosRespuesta.interface';
import { Incidencia } from 'src/app/models/incidencia.interface';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.css'],
})
export class IncidenciaComponent {
  @Input() pedidoIncidencia: pedidoRespuesta | null = null;
  @Output() ocultarIncidencia = new EventEmitter<boolean>();
  servicioIncidencias = inject(IncidenciasService);
  incidenciasPedido: Incidencia[] | null = null;

  async cambioValorVista(idIncidencia:number,vista:boolean){
    try{
      if(vista){
        await this.servicioIncidencias.updateIncidenciaToNoVista(idIncidencia);
      }else{
        await this.servicioIncidencias.updateIncidenciaToVista(idIncidencia);
      }
      if(this.incidenciasPedido){
        this.incidenciasPedido.forEach(element => {
          if(element.idincidencia ==idIncidencia ){
            element.vista = !element.vista;
          }
        });
      }
    }catch(error){
      Swal.fire({
        icon: 'error',
        title:
          'Error al cambiar de estado la incidencia. Consulte con el administrador.',
      });
    }
  }

  cerrar() {
    this.ocultarIncidencia.emit(true);
  }
  async ngOnInit() {
    if (this.pedidoIncidencia?.idPedido) {
      try {
        this.incidenciasPedido =
          await this.servicioIncidencias.getIncidenciaByIdPedido(
            this.pedidoIncidencia?.idPedido
          );
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title:
            'Error al obtener las incidencias. Consulte con el administrador.',
        });
      }
    }
  }
}
