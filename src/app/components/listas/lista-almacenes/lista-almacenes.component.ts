import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Almacen } from 'src/app/models/almacen.interface';
import { AlmacenService } from 'src/app/services/almacen.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-almacenes',
  templateUrl: './lista-almacenes.component.html',
  styleUrls: ['./lista-almacenes.component.css']
})
export class ListaAlmacenesComponent implements OnInit, OnDestroy {

  arrAlmacenes: Almacen[] = [];
  actualizarAlmacenSubscription: Subscription = new Subscription();
  mostrarSoloActivos: boolean = false;
  mostrarSoloActivosTexto: string = 'Mostrar solo activos';
  filtroNombre: string = '';

  constructor(
    private almacenService: AlmacenService,
    private router: Router,
    public imagenesService: ImagenesService
  ) {}

  ngOnInit() {
    try {
      this.cargarAlmacenes();
      this.actualizarAlmacenSubscription = this.almacenService.actualizarAlmacen$.subscribe(() => {
        this.cargarAlmacenes();
      });
    } catch (error: any) {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    if (this.actualizarAlmacenSubscription) {
      this.actualizarAlmacenSubscription.unsubscribe();
    }
  }

  async cargarAlmacenes(): Promise<void> {
    try {
      const response = await this.almacenService.getAll();
      this.arrAlmacenes = response;

      // Filtrar por la propiedad activo si el flag está activado
      if (this.mostrarSoloActivos) {
        this.arrAlmacenes = this.arrAlmacenes.filter(almacen => almacen.activo);
      }

      // Filtrar por el nombre si hay un valor en el filtroNombre
      if (this.filtroNombre.trim() !== '') {
        this.arrAlmacenes = this.arrAlmacenes.filter(almacen =>
          almacen.nombre_almacen.toLowerCase().includes(this.filtroNombre.toLowerCase())
        );
      }
    } catch (error) {
      console.error('Error al cargar los almacenes:', error);
    }
  }

  toggleEstadoAlmacen(almacen: Almacen): void {
    const operation$ = almacen.activo
      ? this.almacenService.deactivateAlmacen(almacen.idalmacen)
      : this.almacenService.activateAlmacen(almacen.idalmacen);

    operation$.subscribe(() => {
      this.almacenService.actualizarAlmacenSubject.next();
    });
  }

  getTextoActivo(activo: boolean): string {
    return activo ? 'Sí' : 'No';
  }

  getClasesActivo(estadoActivo: boolean): any {
    return {
      'bg-success-subtle': estadoActivo,
      'border-danger-subtle': !estadoActivo
    };
  }

  // Filtro activos/inactivos
  toggleFiltroActivo(): void {
    this.mostrarSoloActivos = !this.mostrarSoloActivos;
    this.actualizarTextoBoton();
    this.cargarAlmacenes();
  }

  private actualizarTextoBoton(): void {
    this.mostrarSoloActivosTexto = this.mostrarSoloActivos ? 'Mostrar todos' : 'Mostrar solo activos';
  }

  // Filtrado/Búsqueda
  buscarAlmacenes(): void {
    this.cargarAlmacenes();
  }

   // Limpiar el filtro de búsqueda
   limpiarFiltro(): void {
    this.filtroNombre = '';
    this.cargarAlmacenes();
  }

}
