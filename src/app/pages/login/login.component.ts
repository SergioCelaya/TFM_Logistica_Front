import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log('Formulario enviado:', this.loginForm.value);
      this.servicioAuth.login(this.loginForm.value);
    }
  }

  empleado() {
    const user: User = {
      email: 'luciano.garcia@example.com',
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
