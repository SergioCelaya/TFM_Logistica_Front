import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Empleado } from 'src/app/models/empleado.interface';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MapService } from 'src/app/services/map.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  servicioAuth = inject(AuthService);
  private user: User = {
    email: '',
    pwd: '',
  };
  loginForm: FormGroup;
  private loggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());


  async ngOnInit(){
    if(localStorage.getItem("token")){
      this.servicioAuth.logout();
    }
  }

  constructor(private fb: FormBuilder) {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', Validators.required],
    });
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  async login() {
    
    if (this.loginForm.valid) {
      const result = await this.servicioAuth.login(this.loginForm.value);
      if(result.Error != undefined && result.Error != ""){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Login error',
          text: result.Error.toString(),
          showConfirmButton: false,
          timer: 4000,
        });
      }
    }
  }

  private tokenAvailable(): boolean {
    return !!localStorage.getItem('token');
  }

  empleado() {
    const user: User = {
      email: 'juan.perez@example.com',
      pwd: '12345678',
    };
    this.servicioAuth.login(user);
  }

  encargado() {
    const user: User = {
      email: 'Fermin.Lopez@example.com',
      pwd: '12345679',
    };
    this.servicioAuth.login(user);
  }
  admin() {
    const user: User = {
      email: 'Leire.rins@example.com',
      pwd: '12345779',
    };
    this.servicioAuth.login(user);
  }
}
