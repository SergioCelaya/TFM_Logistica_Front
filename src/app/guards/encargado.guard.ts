import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Empleado } from '../models/empleado.interface';

@Injectable({
  providedIn: 'root'
})
export class EncargadoGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}


  async canActivate(): Promise<boolean> {

    let empleado:Empleado = await this.authService.getUser();
    if (empleado.puesto == "Encargado" ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
