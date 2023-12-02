import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, isEmpty } from 'rxjs';
import { User } from '../models/user.interface';
import { Auth } from '../models/Respuestas_API/auth.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from '../models/empleado.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());
  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private baseUrl: string = 'http://localhost:3000/api/login';

  constructor() {}

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  async login(user: User) {
    try {
      if (user.email !== '' && user.pwd !== '') {
        const token: Auth = await firstValueFrom(
          this.httpClient.post<Auth>(this.baseUrl, user)
        );
        if (
          token != undefined &&
          token.token != undefined &&
          token.token != ''
        ) {
          localStorage.setItem('token',token.token );
          const usuario: Empleado | null = await this.getUser();
          if (usuario) {
            this.loggedIn.next(true);
            if (usuario.puesto == 'Empleado') {
              this.router.navigate(['/pedidos']);
            } else if (usuario.puesto == 'Encargado') {
              this.router.navigate(['/incidencias']);
            } else {
              this.router.navigate(['/empleados']);
            }
          }
          return { Error: 'Usuario o contraseña incorrectos' };
        } else {
          return { Error: 'Usuario o contraseña incorrectos' };
        }
      } else {
        return { Error: 'Usuario o contraseña incorrectos' };
      }
    } catch (error) {
      return { Error: error };
    }
  }

  async getUser() {
    try {
      const token = localStorage.getItem('token');
      console.log(token)
      if (token) {
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: token,
        });

        let options = { headers: headers };
        const usuario = await firstValueFrom(
          this.httpClient.post<Empleado>(
            this.baseUrl + '/getUser',
            null,
            options
          )
        );
        if (!usuario) {
          return null;
        }
        return usuario;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  private tokenAvailable(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
