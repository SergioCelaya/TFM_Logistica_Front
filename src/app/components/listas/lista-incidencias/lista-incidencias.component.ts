import { Component } from '@angular/core';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { Router } from '@angular/router';
import { Incidencia } from 'src/app/models/incidencia.interface';
import { allIncidencia } from 'src/app/models/Respuestas_API/allIncidencias.interface';
import { IncidenciaRespuesta } from 'src/app/models/Respuestas_API/incidenciaRespuesta.interface';

@Component({
  selector: 'app-lista-incidencias',
  templateUrl: './lista-incidencias.component.html',
  styleUrls: ['./lista-incidencias.component.css']
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

  constructor(
    private incidenciasService: IncidenciasService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.currentpagina = 1;
    try {
      this.cargarIncidencias(this.currentpagina);
      
    } catch (error: any) {
      this.router.navigate(['/login']);
    }
  }
  async cargarIncidencias(pagina:number): Promise<void> {
    try {  

      this.Resultado = await this.incidenciasService.getAll(pagina);
      console.log(this.Resultado)
      this.arrIncidencias = this.Resultado.Resultado;
      this.totalPaginas = Math.ceil(this.Resultado.TotalElementos / this.Resultado.ElementosPagina);
      this.paginaActual = pagina;
      console.log(this.arrIncidencias)

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

  // seleccionarIncidencia(incidencia: IncidenciaRespuesta): void {
  //   this.incidenciasService.seleccionarIncidencia(incidencia);
  // }

  iraeditarincidencia(idincidencia: any) {
    this.router.navigate(['/editarIncidencia/'+ idincidencia]);
    console.log(idincidencia)
    }
}
