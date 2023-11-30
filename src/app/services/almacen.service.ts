// almacen.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable,lastValueFrom } from 'rxjs';
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
  getAll(): Promise<Almacen[]> {
    return lastValueFrom(this.httpClient.get<Almacen[]>(this.baseUrl));
  }

  // Crear un almacén
  create(almacenForm: Almacen): Promise<Almacen> {
    return lastValueFrom(this.httpClient.post<Almacen>(this.baseUrl, almacenForm));
  }

  // Obtener un almacén por su ID
  getById(idAlmacen: number): Promise<Almacen> {
    return lastValueFrom(this.httpClient.get<Almacen>(`${this.baseUrl}/${idAlmacen}`));
  }

  // Actualizar info almacén
  updateAlmacen(almacenForm: Almacen): Promise<Almacen> {
      return lastValueFrom(this.httpClient.put<Almacen>(`${this.baseUrl}/${almacenForm.idalmacen}`, almacenForm));
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

  // Función para actualizar el detalle del almacén seleccionado
  actualizarInfoAlmacen(almacen: Almacen | null) {
    this.detalleAlmacen.next(almacen);
  }
}
