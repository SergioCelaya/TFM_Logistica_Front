import { Component, OnInit } from '@angular/core';
import { EmpleadoRespuesta } from 'src/app/models/Respuestas_API/empleadoRespuesta.interface';
import { EmpleadosService } from 'src/app/services/empleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {
  empleado: EmpleadoRespuesta | null = null;

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit(): void {
    try {
      this.empleadosService.empleadoSeleccionado$.subscribe(empleado => {
        this.empleado = empleado;
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al suscribirse'
        //TODO: revisar titulo
      });
    }
  }
}