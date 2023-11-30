// lista-almacenes.component.ts
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Almacen } from 'src/app/models/almacen.interface';
import { AlmacenService } from 'src/app/services/almacen.service';

@Component({
  selector: 'app-lista-almacenes',
  templateUrl: './lista-almacenes.component.html',
  styleUrls: ['./lista-almacenes.component.css']
})
export class ListaAlmacenesComponent {
  private almacenService = inject(AlmacenService);
  private router = inject(Router);
  arrAlmacenes: Almacen[] = [];

  constructor() {}

  async ngOnInit() {
    try {
      const response = await this.almacenService.getAll();
      this.arrAlmacenes = response;
    } catch (error: any) {
      this.router.navigate(['/login']);
    }
  }

  // Nueva función para actualizar el almacén seleccionado
  actualizarAlmacenSeleccionado(almacen: Almacen) {
    this.almacenService.actualizarAlmacenSeleccionado(almacen);
  }
}
