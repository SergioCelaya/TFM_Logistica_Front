import { Component, OnInit } from '@angular/core';
import { EmpleadoRespuesta } from 'src/app/models/Respuestas_API/empleadoRespuesta.interface';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-empleado',
  templateUrl: './detalle-empleado.component.html',
  styleUrls: ['./detalle-empleado.component.css']
})
export class DetalleEmpleadoComponent implements OnInit {
  empleado: EmpleadoRespuesta | null = null;

  constructor(
    private empleadosService: EmpleadosService,
    private router: Router,
    public imagenesService: ImagenesService
  ) {}
  ngOnInit(): void {
    try {
      this.empleadosService.empleadoSeleccionado$.subscribe(empleado => {
        this.empleado = empleado;
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al suscribirse'
      });
    }
  }

  editarEmpleado(): void {
    if (this.empleado && this.empleado.idempleado) {
      this.router.navigate(['/empleado/editar', this.empleado.idempleado]);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha seleccionado ningún empleado para editar.'
      });
    }
  }

  activarDesactivarEmpleado(empleado: EmpleadoRespuesta): void {
    let nuevoEstado = empleado.activo === 1 ? 0 : 1;

    this.empleadosService.updateEmpleadoEstado(empleado.idempleado, nuevoEstado)
      .then(response => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'El estado del empleado ha sido actualizado.',
          icon: 'success'
        }).then(() => {
          location.reload();
        });
      })
      .catch(error => {
        console.error('Error al cambiar el estado:', error);
        Swal.fire('Error', 'Ha ocurrido un error al cambiar el estado.', 'error');
      });
}
}
