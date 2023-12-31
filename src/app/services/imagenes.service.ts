import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  private httpClient = inject(HttpClient);
  private baseUrl: string = 'http://localhost:3000/api/imagenes';
  private urlAlmacenes: string = '/getImagenAlmacen/';
  private urlEmpleados: string = '/getImagenEmpleado/';
  private uploadAlmacen: string = '/uploadImagenAlmacen/';
  private uploadEmpleado: string = '/uploadImagenEmpleado/';

  getImagenAlmacen(nombreImg: string): string {
    return this.baseUrl + this.urlAlmacenes + nombreImg;
  }

  getImagenEmpleado(nombreImg: string): string {
    return this.baseUrl + this.urlEmpleados + nombreImg;
  }

  async guardarImagenEmpleado(imagen: File, idEmpleado: number) {
    try {
      if (imagen) {
        const data = new FormData();
        data.append('imagen', imagen, imagen.name);
        let req = await firstValueFrom(this.httpClient.post(this.baseUrl + this.uploadEmpleado + idEmpleado, data));
        return req;
      } else {
        return null;
      }
    } catch (Error) {
      return Error;
    }
  }

  async guardarImagenAlmacen(imagen: File, idAlmacen: number) {
    try {
      if (imagen) {
        const data = new FormData();
        data.append('imagen', imagen, imagen.name);
        let req = await firstValueFrom(this.httpClient.post(this.baseUrl + this.uploadAlmacen + idAlmacen, data));
        return req;
      } else {
        return null;
      }
    } catch (Error) {
      //TODO
      return Error;
    }
  }

  constructor() {}
}
