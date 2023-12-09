import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
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

  async ngOnInit() {
  }

  async guardarIncidencia() {
    if (this.pedidoIncidencia?.idPedido) {
      const incidencia: Incidencia = {
        idincidencia: null,
        descripcion: this.textoIncidencia.toString(),
        tipo_incidencia: '1',
        idpedido_asociado: this.pedidoIncidencia?.idPedido,
        titulo: this.titulo,
        vista: false,
      };
      console.log(incidencia)
      try {
        await this.servicioIncidencias.create(incidencia);
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title:
            'Error al guardar la incidencia. Consulte con el administrador.',
        });
      }
      Swal.fire({
        icon: 'success',
        title:
          'Incidencia guardada correctamente.',
      });
      this.ocultarIncidencia.emit(true);
    }
  }
}
