import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { EmpleadoRespuesta } from 'src/app/models/Respuestas_API/empleadoRespuesta.interface';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { response } from 'express';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css'],
})
export class ListaEmpleadosComponent implements OnInit {
  empleados: EmpleadoRespuesta[] = [];
  empleadosFiltrados: EmpleadoRespuesta[] = [];
  paginaActual: number = 1;
  totalPaginas: number = 0;
  filtroBusqueda: string = '';

  constructor(
    private empleadosService: EmpleadosService,
    private router: Router,
    public imagenesService: ImagenesService
  ) {}

  ngOnInit(): void {
    this.cargarEmpleados(this.paginaActual);
  }

  cargarEmpleados(pagina: number): void {
    this.empleadosService
      .getEmpleadosPaginados(pagina)
      .then((response) => {
        this.empleados = response.Resultado;
        this.empleadosFiltrados = response.Resultado; // Inicializa la lista filtrada
        console.log(this.empleadosFiltrados);
        this.totalPaginas = Math.ceil(
          response.TotalElementos / response.ElementosPagina
        );
        this.paginaActual = response.Pagina;
      })
      .catch((error) => {
        console.error('Error al cargar empleados:', error);
      });
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.cargarEmpleados(pagina);
    }
  }

  aplicarFiltro(): void {
    this.empleadosFiltrados = this.empleados.filter(
      (empleado) =>
        empleado.nombre
          .toLowerCase()
          .includes(this.filtroBusqueda.toLowerCase()) ||
        empleado.apellidos
          .toLowerCase()
          .includes(this.filtroBusqueda.toLowerCase())
    );
  }

  mostrarTodos() {
   
    this.cargarEmpleados(this.paginaActual);
  }

  seleccionarEmpleado(empleado: EmpleadoRespuesta): void {
    try {
      this.empleadosService.seleccionarEmpleado(empleado);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al seleccionar empleado',
        text: 'Ocurrió un error al seleccionar el empleado. Por favor, inténtalo de nuevo.'
      });
    }
  }

  crearEmpleado(): void {
    try {
      this.router.navigate(['/empleado/nuevo']);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al crear empleado',
        text: 'Ocurrió un error al intentar crear un nuevo empleado. Por favor, inténtalo de nuevo.'
      });
    }
  }


  activarDesactivarEmpleado(empleado: EmpleadoRespuesta): void {
    let nuevoEstado = empleado.activo === 1 ? 0 : 1;

    this.empleadosService.updateEmpleadoEstado(empleado.idempleado, nuevoEstado)
      .then(response => {
        // Mostrar SweetAlert y esperar a que el usuario presione "OK"
        Swal.fire({
          title: '¡Éxito!',
          text: 'El estado del empleado ha sido actualizado.',
          icon: 'success'
        }).then(() => {
          location.reload(); // Recarga la página después de que se presione "OK"
        });
      })
      .catch(error => {
        console.error('Error al cambiar el estado:', error);
        Swal.fire('Error', 'Ha ocurrido un error al cambiar el estado.', 'error');
      });
}


}
