import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { EmpleadoRespuesta } from 'src/app/models/Respuestas_API/empleadoRespuesta.interface';

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css']
})
export class ListaEmpleadosComponent implements OnInit {
  empleados: EmpleadoRespuesta[] = [];
  empleadosFiltrados: EmpleadoRespuesta[] = [];
  paginaActual: number = 1;
  totalPaginas: number = 0;
  filtroBusqueda: string = '';

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit(): void {
    this.cargarEmpleados(this.paginaActual);
  }

  cargarEmpleados(pagina: number): void {
    this.empleadosService.getEmpleadosPaginados(pagina).then(response => {
      this.empleados = response.Resultado;
      this.empleadosFiltrados = response.Resultado; // Inicializa la lista filtrada
      this.totalPaginas = Math.ceil(response.TotalElementos / response.ElementosPagina);
      this.paginaActual = response.Pagina;
    }).catch(error => {
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
    this.empleadosFiltrados = this.empleados.filter(empleado => 
      empleado.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
      empleado.apellidos.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
    );
  }

  seleccionarEmpleado(empleado: EmpleadoRespuesta): void {
    this.empleadosService.seleccionarEmpleado(empleado);
    // Aquí puedes redireccionar al componente de detalles si es necesario
  }

}

