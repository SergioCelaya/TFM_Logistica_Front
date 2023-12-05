// almacen.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable,lastValueFrom, map, tap } from 'rxjs';
import { Almacen } from '../models/almacen.interface';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {

  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:3000/api/almacenes';

  // ACTUALIZAR ESTADO ACTIVO/DESATIVADO ALMACENES
  public actualizarAlmacenSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  actualizarAlmacen$: Observable<void> = this.actualizarAlmacenSubject.asObservable();

  // FILTRADO ALMACENES POR ESTADO ACTIVO
  private mostrarSoloActivos: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  mostrarSoloActivos$: Observable<boolean> = this.mostrarSoloActivos.asObservable();

  // METODOS INTERACCION BBDD

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
  activateAlmacen(idAlmacen: number): Observable<Almacen> {
    return this.httpClient.put<Almacen>(`${this.baseUrl}/toActive/${idAlmacen}`, {}).pipe(tap(() => this.actualizarAlmacenSubject.next()));
  }

  // Desactivar un almacén por su ID
  deactivateAlmacen(idAlmacen: number): Observable<Almacen> {
    return this.httpClient.put<Almacen>(`${this.baseUrl}/toInactive/${idAlmacen}`, {}).pipe(tap(() => this.actualizarAlmacenSubject.next()));
  }

  // METODOS FRONT

  // Función para actualizar el filtro activo/inactivo
  actualizarMostrarSoloActivos(value: boolean): void {
    this.mostrarSoloActivos.next(value);
  }

}
