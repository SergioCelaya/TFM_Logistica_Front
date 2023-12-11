import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  userPuesto: string = '';
  empleado: any;

  constructor(private authService: AuthService,
    public imagenesService: ImagenesService
    ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.authService.getUser().then((empleado) => {
      this.userPuesto = empleado.puesto;
      this.empleado = empleado;
    }).catch(
      error=>{
        Swal.fire({
          icon: 'error',
          title:
            'Error al cargar la lista de pedidos. Consulte con el administrador.',
        });
      }
    )
  }

  onLogout() {
    this.authService.logout();
  }

  isEmpleado(): boolean {
    return this.userPuesto === 'Empleado';
  }

  isEncargado(): boolean {
    return this.userPuesto === 'Encargado';
  }

  isAdmin(): boolean {
    return this.userPuesto === 'Administrador';
  }

  getInicioRoute(): string {
    if (this.isEmpleado() || this.isEncargado()) {
      return '/pedidos';
    } else if (this.isAdmin()) {
      return '/almacenes';
    } else {
      return '/login';
    }
  }
}

