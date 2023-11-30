// detalle-almacen.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { AlmacenService } from 'src/app/services/almacen.service';
import { Almacen } from 'src/app/models/almacen.interface';

@Component({
  selector: 'app-detalle-almacen',
  templateUrl: './detalle-almacen.component.html',
  styleUrls: ['./detalle-almacen.component.css']
})
export class DetalleAlmacenComponent implements OnInit {

  private almacenService = inject(AlmacenService);
  almacenSeleccionado: Almacen | null = null;

  ngOnInit() {
    // Obtén el primer almacén al inicializar el componente
    this.almacenService.almacenSeleccionado$.subscribe((almacen) => {
      this.almacenSeleccionado = almacen || null;
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
}
