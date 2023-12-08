import { Component, OnInit } from '@angular/core';
import { IncidenciaRespuesta } from 'src/app/models/Respuestas_API/incidenciaRespuesta.interface';
import { IncidenciasService } from 'src/app/services/incidencias.service';

@Component({
  selector: 'app-detalle-incidencia',
  templateUrl: './detalle-incidencia.component.html',
  styleUrls: ['./detalle-incidencia.component.css']
})

export class DetalleIncidenciaComponent {}
// export class DetalleIncidenciaComponent implements OnInit {
//   incidencia: IncidenciaRespuesta | null = null;

//   // constructor(private incidenciasService: IncidenciasService) {}

//   // ngOnInit(): void {
//   //   this.incidenciasService.incidenciaSeleccionada$.subscribe(incidencia => {
//   //     this.incidencia = incidencia;
//   //   });
//   // }
// }