import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MapService } from 'src/app/services/map.service';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  servicioMapa = inject(MapService);
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
      console.log(empleado);
    })
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

