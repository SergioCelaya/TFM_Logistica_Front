import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Correo } from '../models/correo.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorreoService {
  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:3000/api/correos/';

  async mandarCorreo(correo: Correo){
    return await firstValueFrom(
      this.httpClient.post(`${this.baseUrl}`, correo)
    );
  }

  constructor() { }
}
