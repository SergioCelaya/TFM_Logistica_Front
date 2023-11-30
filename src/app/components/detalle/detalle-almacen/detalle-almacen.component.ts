import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AlmacenService } from 'src/app/services/almacen.service';
import { Almacen } from 'src/app/models/almacen.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-almacen',
  templateUrl: './detalle-almacen.component.html',
  styleUrls: ['./detalle-almacen.component.css']
})
export class DetalleAlmacenComponent implements OnInit, OnDestroy {

  private almacenService = inject(AlmacenService);
  almacenSeleccionado: Almacen | null = null;
  actualizarAlmacenSubscription: Subscription = new Subscription();

  ngOnInit() {
    // Obtén el primer almacén al inicializar el componente
    this.almacenService.almacenSeleccionado$.subscribe((almacen) => {
      this.almacenSeleccionado = almacen || null;
    });

    // Suscribirse al evento de actualización del almacén
    this.actualizarAlmacenSubscription = this.almacenService.actualizarAlmacen$.subscribe(() => {
      // Actualizar el estado del almacén seleccionado
      if (this.almacenSeleccionado) {
        const idAlmacen = this.almacenSeleccionado.idalmacen;
        this.almacenService.getById(idAlmacen).then((almacen) => {
          this.almacenService.actualizarInfoAlmacen(almacen);
        });
      }
    });

    // Si el almacén seleccionado aún no se ha establecido (puede ser null),
    // obtén el primer almacén para mostrar la información por defecto
    if (!this.almacenSeleccionado) {
      this.almacenService.getAll().then((almacenes) => {
        if (almacenes && almacenes.length > 0) {
          this.almacenService.actualizarInfoAlmacen(almacenes[0]);
        }
      });
    }
  }

  ngOnDestroy(): void {
    // Liberar la suscripción cuando el componente se destruye
    if (this.actualizarAlmacenSubscription) {
      this.actualizarAlmacenSubscription.unsubscribe();
    }
  }
}
