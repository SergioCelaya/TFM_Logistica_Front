import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { EmpleadoRespuesta } from 'src/app/models/Respuestas_API/empleadoRespuesta.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private router: Router
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

  seleccionarEmpleado(empleado: EmpleadoRespuesta): void {
    this.empleadosService.seleccionarEmpleado(empleado);
  }

  crearEmpleado(): void {
    this.router.navigate(['/empleado/nuevo']);
  }

  editarEmpleado(empleado: EmpleadoRespuesta): void {
    this.router.navigate(['/empleado/editar', empleado.idempleado]);
  }
  

  activarDesactivarEmpleado(empleado: EmpleadoRespuesta): void {
    let nuevoEstado = empleado.activo === 1 ? 0 : 1;
  
    this.empleadosService.updateEmpleadoEstado(empleado.idempleado, nuevoEstado)
      .then(response => {
        console.log(response); // Imprime la respuesta para depuración
        if (response && response.success) { // Asegúrate de que la respuesta indica éxito
          empleado.activo = nuevoEstado;
          Swal.fire('¡Éxito!', 'El estado del empleado ha sido actualizado.', 'success');
        } else {
          Swal.fire('Error', 'No se pudo cambiar el estado del empleado.', 'error');
        }
      })
      .catch(error => {
        console.error('Error al cambiar el estado:', error);
        Swal.fire('Error', 'Ha ocurrido un error al cambiar el estado.', 'error');
      });
  }
  
}
