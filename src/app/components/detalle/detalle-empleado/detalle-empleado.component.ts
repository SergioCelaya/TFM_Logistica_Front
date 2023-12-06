import { Component, OnInit } from '@angular/core';
import { EmpleadoRespuesta } from 'src/app/models/Respuestas_API/empleadoRespuesta.interface';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {
  empleado: EmpleadoRespuesta | null = null;

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit(): void {
    this.empleadosService.empleadoSeleccionado$.subscribe(empleado => {
      this.empleado = empleado;
    });
  }
}