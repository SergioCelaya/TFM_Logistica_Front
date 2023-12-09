import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { left } from '@popperjs/core';
import { pedidoRespuesta } from 'src/app/models/Respuestas_API/pedidosRespuesta.interface';
import { Incidencia } from 'src/app/models/incidencia.interface';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-incidencia',
  templateUrl: './new-incidencia.component.html',
  styleUrls: ['./new-incidencia.component.css'],
})
export class NewIncidenciaComponent {
  @Input() pedidoIncidencia: pedidoRespuesta | null = null;
  @Output() ocultarIncidencia = new EventEmitter<boolean>();
  servicioIncidencias = inject(IncidenciasService);
  textoIncidencia: any;
  titulo: any;

  cerrar() {
    this.ocultarIncidencia.emit(true);
  }

  async ngOnInit() {}

  async guardarIncidencia() {
    let incidencia: Incidencia = {
      idincidencia: null,
      descripcion: "",
      tipo_incidencia: '1',
      idpedido_asociado: 0,
      titulo: "",
      vista: false,
    };
    if (this.pedidoIncidencia?.idPedido) {
      if (this.titulo != undefined && this.textoIncidencia != undefined) {
        incidencia = {
          idincidencia: null,
          descripcion: this.textoIncidencia.toString(),
          tipo_incidencia: '1',
          idpedido_asociado: this.pedidoIncidencia?.idPedido,
          titulo: this.titulo,
          vista: false,
        };
        try {
          let respuesta :any = null;
           respuesta = await this.servicioIncidencias.create(incidencia)
          if(respuesta.fatal){
            Swal.fire({
              icon: 'error',
              title:
                'Error al guardar la incidencia. Consulte con el administrador.',
            });
          }else{
            Swal.fire({
              icon: 'success',
              title: 'Incidencia guardada correctamente.',
            });
            this.ocultarIncidencia.emit(true);
          }
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title:
              'Error al guardar la incidencia. Consulte con el administrador.',
          });
        }
      }else{
        Swal.fire({
          icon: 'error',
          title:
            'Error, la incidencia debe de tener título y descripción.',
        });
      }
    }
  }
}
