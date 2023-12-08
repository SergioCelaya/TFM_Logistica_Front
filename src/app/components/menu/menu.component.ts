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
    console.log("Entra")
    this.isLoggedIn$ = this.authService.isLoggedIn;
    console.log(this.isLoggedIn$)
    this.authService.getUser().then((empleado) => {
      console.log("Entra 3")
      this.userPuesto = empleado.puesto;
      console.log("Entra 4")
      this.empleado = empleado;
      console.log(empleado);
    }).catch(
      error=>{
        console.log(error)
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

  // Helper methods to check user's position
  isEmpleado(): boolean {
    return this.userPuesto === 'Empleado';
  }

  isEncargado(): boolean {
    return this.userPuesto === 'Encargado';
  }

  isAdmin(): boolean {
    return this.userPuesto === 'Administrador';
  }

}

