import { Component } from '@angular/core';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { Router } from '@angular/router';
import { Incidencia } from 'src/app/models/incidencia.interface';
import { allIncidencia } from 'src/app/models/Respuestas_API/allIncidencias.interface';
import { IncidenciaRespuesta } from 'src/app/models/Respuestas_API/incidenciaRespuesta.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-incidencias',
  templateUrl: './lista-incidencias.component.html',
  styleUrls: ['./lista-incidencias.component.css', '../../incidencia/incidencia.component.css']
})
export class ListaIncidenciasComponent {

  arrIncidencias: any = {};
  resultados: any = {};
  currentpagina: number = 0;
  Resultado: allIncidencia|null=null;
  paginaActual: number = 1;
  totalPaginas: number = 0;
  incidencias: IncidenciaRespuesta[] = [];
  incidencia: any
  numeroPaginas: number = 0;
  arrayPaginas = Array(this.numeroPaginas);
  idPedido: any
  numIncidencia: any;

  constructor(
    private incidenciasService: IncidenciasService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.currentpagina = 1;
    try {
      this.cargarIncidencias(this.currentpagina);
     // this.incidenciasService.incidenciaSeleccionada$ = this.arrIncidencias[0];
    } catch (error: any) {
      this.router.navigate(['/login']);
    }
  }
  async cargarIncidencias(pagina:number): Promise<void> {
    try {  

      this.Resultado = await this.incidenciasService.getAll(pagina);
      this.arrIncidencias = this.Resultado.Resultado;
      this.totalPaginas = Math.ceil(this.Resultado.TotalElementos / this.Resultado.ElementosPagina);
      this.incidenciasService.seleccionarIncidencia(this.arrIncidencias[0])
      this.paginaActual = pagina;

    } catch (error: any) {
      this.router.navigate(['/login']);
    }
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
      this.cargarIncidencias(pagina);
    }
  }

  iraeditarincidencia(idincidencia: any) {
    this.router.navigate(['/editarIncidencia/'+ idincidencia]);
    console.log(idincidencia)
    }

//AQUI VA EL CLICK PARA SELECCIONAR QUÉ INCIDENCIA VER EN DETALLE INCIDENCIA
    seleccionarIncidencia(incidencia: IncidenciaRespuesta): void {
      this.incidenciasService.seleccionarIncidencia(incidencia);
    }

    vistaNoVista(value: number): string {
      return value === 0 ? 'noVista' : 'vista';
    }


    //Buscar incidencia

    

    async buscarIncidenciaId() {
      let incidencia: Incidencia[] | null = null;
      try {
        incidencia = await this.incidenciasService.getIncidenciaByIdPedido(this.numIncidencia);
        
        console.log(incidencia)
      } catch (error) {
        console.error('Error al buscar incidencias:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar la lista de incidencias. Consulte con el administrador.',
        });
        return;
      }
      if (incidencia && incidencia.length > 0) {
        this.arrIncidencias = incidencia;
        this.numeroPaginas = 1; // o ajusta según el número de resultados
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
