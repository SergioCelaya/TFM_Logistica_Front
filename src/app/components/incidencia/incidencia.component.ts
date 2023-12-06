import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { pedidoRespuesta } from 'src/app/models/Respuestas_API/pedidosRespuesta.interface';
import { IncidenciasService } from 'src/app/services/incidencias.service';

@Component({
  selector: 'app-incidencia',
  templateUrl: './incidencia.component.html',
  styleUrls: ['./incidencia.component.css'],
})
export class IncidenciaComponent {
  @Input() pedidoIncidencia: pedidoRespuesta | null = null;
  @Output() ocultarIncidencia = new EventEmitter<boolean>();
  servicioIncidencias = inject(IncidenciasService);

  cerrar() {
    console.log("emite")
    this.ocultarIncidencia.emit(true);
  }
  ngOnInit(){
    if(this.pedidoIncidencia?.idPedido){
      
    }
  }
}
