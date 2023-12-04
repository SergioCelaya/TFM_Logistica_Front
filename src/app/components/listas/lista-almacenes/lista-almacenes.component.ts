import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Almacen } from 'src/app/models/almacen.interface';
import { AlmacenService } from 'src/app/services/almacen.service';
import { ImagenesService } from 'src/app/services/imagenes.service'; // Reemplaza 'ruta-de-tu-servicio' con la ruta real de tu servicio
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-almacenes',
  templateUrl: './lista-almacenes.component.html',
  styleUrls: ['./lista-almacenes.component.css']
})
export class ListaAlmacenesComponent implements OnInit, OnDestroy {

  arrAlmacenes: Almacen[] = [];
  actualizarAlmacenSubscription: Subscription = new Subscription();

  constructor(
    private almacenService: AlmacenService,
    private router: Router,
    public imagenesService: ImagenesService
  ) {}

  ngOnInit() {
    try {
      // Cargar la lista de almacenes
      this.cargarAlmacenes();
      // Suscribirse al evento de actualización del almacén
      this.actualizarAlmacenSubscription = this.almacenService.actualizarAlmacen$.subscribe(() => {
        this.cargarAlmacenes();
      });
    } catch (error: any) {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy(): void {
    // Liberar la suscripción cuando el componente se destruye
    if (this.actualizarAlmacenSubscription) {
      this.actualizarAlmacenSubscription.unsubscribe();
    }
  }

  async cargarAlmacenes(): Promise<void> {
    try {
      const response = await this.almacenService.getAll();
      this.arrAlmacenes = response;
    } catch (error) {
      console.error('Error al cargar los almacenes:', error);
    }
  }

  // Nueva función para actualizar el almacén seleccionado
  actualizarInfoAlmacen(almacen: Almacen): void {
    this.almacenService.actualizarInfoAlmacen(almacen);
  }

  toggleEstadoAlmacen(almacen: Almacen): void {
    const operation$ = almacen.activo
      ? this.almacenService.deactivateAlmacen(almacen.idalmacen)
      : this.almacenService.activateAlmacen(almacen.idalmacen);

    operation$.subscribe(() => {
      // Notificar al servicio que se ha realizado un cambio
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
}
