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
      if (this.incidencia?.vista) {
        this.claseSegunVista = { vista: true };
      } else {
        this.claseSegunVista = { noVista: true };
      }
    });

  }


  iraeditarincidencia(idincidencia: any) {
    this.router.navigate(['/editarIncidencia/'+ this.incidencia?.idincidencia]);
  }

}
