import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  servicioMapa = inject(MapService);
  isLoggedIn$!: Observable<boolean>;
  userPuesto: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.authService.getUser().then((empleado) => {
      this.userPuesto = empleado.puesto;
      console.log(this.userPuesto);
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

