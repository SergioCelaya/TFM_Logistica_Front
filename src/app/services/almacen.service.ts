// almacen.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, BehaviorSubject, Observable } from 'rxjs';
import { Almacen } from '../models/almacen.interface';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  private baseUrl: string = 'http://localhost:3000/api/almacenes';
  private httpClient = inject(HttpClient);

  private almacenSeleccionadoSubject: BehaviorSubject<Almacen | null> = new BehaviorSubject<Almacen | null>(null);
  almacenSeleccionado$: Observable<Almacen | null> = this.almacenSeleccionadoSubject.asObservable();

  constructor() {}

  getAll() {
    return firstValueFrom(
      this.httpClient.get<Almacen[]>(this.baseUrl)
    );
  }

  // Nueva función para actualizar el almacén seleccionado
  actualizarAlmacenSeleccionado(almacen: Almacen | null) {
    this.almacenSeleccionadoSubject.next(almacen);
  }
}
