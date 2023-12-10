import { Component, OnInit } from '@angular/core';
import { IncidenciaRespuesta } from 'src/app/models/Respuestas_API/incidenciaRespuesta.interface';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-incidencia',
  templateUrl: './detalle-incidencia.component.html',
  styleUrls: ['./detalle-incidencia.component.css', '../../incidencia/incidencia.component.css']
})



export class DetalleIncidenciaComponent implements OnInit {
  claseSegunVista:any = '';
  incidencia: IncidenciaRespuesta | null = null;
  constructor(
    private incidenciasService: IncidenciasService,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.incidenciasService.incidenciaSeleccionada$.subscribe(incidencia => {
      this.incidencia = incidencia;
      console.log("el click pasa por el ts de detalle incidencia" + " " + this.incidencia?.idIncidencia)

      if (this.incidencia?.vista) {
        this.claseSegunVista = { vista: true };
      } else {
        this.claseSegunVista = { noVista: true };
      }
    });

  }


  editarIncidencia(): void {
    if (this.incidencia && this.incidencia.idIncidencia) {
      this.router.navigate(['editarIncidencia/' + this.incidencia?.idIncidencia]);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha seleccionado ninguna incidencia para editar.'
      });
    }
  }

}
