import { Component } from '@angular/core';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import { Router } from '@angular/router';
import { Incidencia } from 'src/app/models/incidencia.interface';
import { allIncidencia } from 'src/app/models/Respuestas_API/allIncidencias.interface';

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
      console.log("pasando por aqui")
      console.log(this.arrIncidencias)

    } catch (error: any) {
      this.router.navigate(['/login']);
    }
  }

  
  async siguientePagina() {
    this.currentpagina = this.currentpagina + 1;
    try {
      this.cargarIncidencias(this.currentpagina);
      
    } catch (error: any) {
      this.router.navigate(['/login']);   
    }

  }


  iraeditarincidencia(idincidencia: any) {
    this.router.navigate(['/editarIncidencia/'+ idincidencia]);
    }
}
