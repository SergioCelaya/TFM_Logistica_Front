import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
  servicioMapa = inject(MapService);
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; 
  }

  onLogout(){
    this.authService.logout();                      
  }

}
