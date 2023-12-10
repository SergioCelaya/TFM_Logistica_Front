import { Component, inject } from '@angular/core';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { Router } from '@angular/router';
import { Incidencia } from 'src/app/models/incidencia.interface';
import { allIncidencia } from 'src/app/models/Respuestas_API/allIncidencias.interface';
import { IncidenciaRespuesta } from 'src/app/models/Respuestas_API/incidenciaRespuesta.interface';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Empleado } from 'src/app/models/empleado.interface';
import { ɵinitDomAdapter } from '@angular/platform-browser';

@Component({
  selector: 'app-lista-incidencias',
  templateUrl: './lista-incidencias.component.html',
  styleUrls: [
    './lista-incidencias.component.css',
    '../../incidencia/incidencia.component.css',
  ],
})
export class ListaIncidenciasComponent {
  arrIncidencias: any = {};
  resultados: any = {};
  currentpagina: number = 0;
  respuestaCompleta: allIncidencia | null = null;
  paginaActual: number = 1;
  totalPaginas: number = 0;
  incidencias: IncidenciaRespuesta[] = [];
  incidencia: any;
  arrayPaginas = Array(this.totalPaginas);
  idPedido: any;
  numIncidencia: any;
  totalIncidencias: number = 0;
  incidenciasPagina: number = 0;
  empleado: Empleado = {
    activo: false,
    apellidos: '',
    email: '',
    fecha_contratacion: new Date(),
    idalmacen: 0,
    idempleado: 0,
    imagen_empleado: '',
    nombre: '',
    num_empleado: '',
    puesto: '',
    pwd: '',
  };
  authService = inject(AuthService);

  constructor(
    private incidenciasService: IncidenciasService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.currentpagina = 1;
    try {
      this.cargarIncidencias(this.currentpagina);
      // this.incidenciasService.incidenciaSeleccionada$ = this.arrIncidencias[0];
    } catch (error: any) {
      this.router.navigate(['/login']);
    }
  }
  async cargarIncidencias(pagina: number): Promise<void> {
    try {
      this.empleado = await this.authService.getUser();
      if (this.empleado.puesto != 'Encargado'){
        this.respuestaCompleta = await this.incidenciasService.getAllEmpleado(
          this.empleado.idempleado,
          pagina);
        }else{
          this.respuestaCompleta = await this.incidenciasService.getAllAlmacen(
            this.empleado.idalmacen,pagina);
        };
      this.arrIncidencias = this.respuestaCompleta.Resultado;
      this.totalPaginas = Math.ceil(
        this.respuestaCompleta.TotalElementos /
          this.respuestaCompleta.ElementosPagina
      );
      if(this.arrIncidencias.length==0){
        this.incidenciasService.seleccionarIncidencia(this.incidencia)
      }
      this.incidenciasService.seleccionarIncidencia(this.arrIncidencias[0]);
      this.paginaActual = pagina;
      this.paginado();
    } catch (error: any) {
      console.log(error);
      this.router.navigate(['/login']);
    }
  }
  irAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual -= 1;
      this.cargarIncidencias(this.paginaActual);
    }
  }
  irSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual += 1;
      this.cargarIncidencias(this.paginaActual);
    }
  }

  paginado() {
    this.totalIncidencias = this.respuestaCompleta?.TotalElementos!;
    this.incidenciasPagina = this.respuestaCompleta?.ElementosPagina!;
    this.totalPaginas = Math.ceil(
      this.totalIncidencias / this.incidenciasPagina
    );
    this.arrayPaginas = Array(this.totalPaginas);
    this.arrIncidencias = this.respuestaCompleta?.Resultado!;
  }
  iraeditarincidencia(idincidencia: any) {
    this.router.navigate(['/editarIncidencia/' + idincidencia]);
  }

  //AQUI VA EL CLICK PARA SELECCIONAR QUÉ INCIDENCIA VER EN DETALLE INCIDENCIA
  seleccionarIncidencia(incidencia: IncidenciaRespuesta): void {
    this.incidenciasService.seleccionarIncidencia(incidencia);
  }
  cargarSiVacio() {
    if (this.numIncidencia == null) {
      this.cargarIncidencias(1);
    }
  }
  vistaNoVista(value: number): string {
    return value === 0 ? 'noVista' : 'vista';
  }

  mostrarTodos() {
    // Llama a la función cargarIncidencias para cargar la lista completa
    this.cargarIncidencias(this.paginaActual);
    this.numIncidencia = '';
  }
    cambiarEstadoVista(resultado: any) {
      resultado.vista = resultado.vista === 1 ? 0 : 1;
    }
    

  //Buscar incidencia
  async buscarIncidenciaId() {
    let incidencia: Incidencia[] | null = null;
    try {
      incidencia = await this.incidenciasService.getIncidenciaByIdPedido(
        this.numIncidencia
      );
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title:
          'Error al cargar la lista de incidencias. Consulte con el administrador.',
      });
      return;
    }
    console.log(incidencia && incidencia.length > 0);
    if (incidencia && incidencia.length > 0) {
      this.arrIncidencias = incidencia;
      this.totalPaginas = 1; // o ajusta según el número de resultados
      this.paginaActual = 1;
      this.arrayPaginas = Array(1);
    } else {
      Swal.fire({
        icon: 'info',
        title: 'No existen incidencias con ese ID de pedido asociado.',
      });
    }
  }
}
