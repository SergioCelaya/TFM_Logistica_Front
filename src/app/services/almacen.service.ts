// almacen.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, BehaviorSubject, Observable } from 'rxjs';
import { Almacen } from '../models/almacen.interface';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:3000/api/almacenes';

  private detalleAlmacen: BehaviorSubject<Almacen | null> = new BehaviorSubject<Almacen | null>(null);
  almacenSeleccionado$: Observable<Almacen | null> = this.detalleAlmacen.asObservable();

  // Devuelve todos los almacenes en la BBDD
  getAll() {
    return firstValueFrom(
      this.httpClient.get<Almacen[]>(this.baseUrl)
    );
  }

  // Actualizar info almacén
  updateAlmacen(almacen: Almacen) {
      const url = `${this.baseUrl}/${almacen.idalmacen}`;
      return this.httpClient.put<Almacen>(url, JSON.stringify(almacen));
  }
  // Crear un almacén
  create(almacenForm: Almacen) {
    return this.httpClient.post<Almacen>(this.baseUrl, JSON.stringify(almacenForm));
  }

  // Activar un almacén por su ID
  activateAlmacen(idAlmacen: number) {
    const url = `${this.baseUrl}/toActive/${idAlmacen}`;
    return this.httpClient.put<Almacen>(url, {});
  }

  // Desactivar un almacén por su ID
  deactivateAlmacen(idAlmacen: number) {
    const url = `${this.baseUrl}/toInactive/${idAlmacen}`;
    return this.httpClient.put<Almacen>(url, {});
  }

  // Obtener un almacén por su ID
  getById(idAlmacen: string) {
    const url = `${this.baseUrl}/${idAlmacen}`;
    return this.httpClient.get<Almacen>(url);
  }

  // Función para actualizar el detalle del almacén seleccionado
  actualizarInfoAlmacen(almacen: Almacen | null) {
    this.detalleAlmacen.next(almacen);
  }
}
