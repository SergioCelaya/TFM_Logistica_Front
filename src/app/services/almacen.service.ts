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
  private activos:string = '/activos';

  public actualizarAlmacenSubject: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  actualizarAlmacen$: Observable<void> = this.actualizarAlmacenSubject.asObservable();

  private mostrarSoloActivos: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  mostrarSoloActivos$: Observable<boolean> = this.mostrarSoloActivos.asObservable();

  getAll(): Promise<Almacen[]> {
    return lastValueFrom(this.httpClient.get<Almacen[]>(this.baseUrl));
  }
  getAllActivos(): Promise<Almacen[]> {
    return lastValueFrom(this.httpClient.get<Almacen[]>(`${this.baseUrl}${this.activos}`));
  }

  create(almacenForm: Almacen): Promise<Almacen> {
    return lastValueFrom(this.httpClient.post<Almacen>(this.baseUrl, almacenForm));
  }

  getById(idAlmacen: number): Promise<Almacen> {
    return lastValueFrom(this.httpClient.get<Almacen>(`${this.baseUrl}/${idAlmacen}`));
  }

  updateAlmacen(almacenForm: Almacen): Promise<Almacen> {
      return lastValueFrom(this.httpClient.put<Almacen>(`${this.baseUrl}/${almacenForm.idalmacen}`, almacenForm));
  }

  activateAlmacen(idAlmacen: number): Observable<Almacen> {
    return this.httpClient.put<Almacen>(`${this.baseUrl}/toActive/${idAlmacen}`, {}).pipe(tap(() => this.actualizarAlmacenSubject.next()));
  }

  deactivateAlmacen(idAlmacen: number): Observable<Almacen> {
    return this.httpClient.put<Almacen>(`${this.baseUrl}/toInactive/${idAlmacen}`, {}).pipe(tap(() => this.actualizarAlmacenSubject.next()));
  }

  actualizarMostrarSoloActivos(value: boolean): void {
    this.mostrarSoloActivos.next(value);
  }

}
