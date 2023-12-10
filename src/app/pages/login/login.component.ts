import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
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

  async ngOnInit() {
    try {
      if (localStorage.getItem('token')) {
        this.servicioAuth.logout();
      }
    } catch (error) {
     Swal.fire({
      icon: 'error',
      title: ''
     });
      //TODO Rellenar motivo de error
    }
  }

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required,Validators.minLength(8)]],
    });
  }

  checkControl(
    formcontrolName: string,
    validator: string
  ): boolean | undefined {
    return (
      this.loginForm.get(formcontrolName)?.hasError(validator) &&
      this.loginForm.get(formcontrolName)?.touched
    );
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  async login() {
    try {
      if (this.loginForm.valid) {
        const result = await this.servicioAuth.login(this.loginForm.value);
        if (result.Error != undefined && result.Error != '') {
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
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error en el inicio de sesión'
        //TODO Revisar titulo
      });
      // Puedes agregar más lógica de manejo de errores si es necesario
    }
  }
  onClickSubmit(data:any) {
    alert("Entered Email id : " + data.emailid);
 }
  private tokenAvailable(): boolean {
    return !!localStorage.getItem('token');
  }

  async empleado() {
    try {
      const user: User = {
        email: 'juan.perez@example.com',
        pwd: '12345678',
      };
      await this.servicioAuth.login(user);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al realizar la operación'
      });

    }
  }

  async encargado() {
    try {
      const user: User = {
        email: 'Fermin.Lopez@example.com',
        pwd: '12345679',
      };
      await this.servicioAuth.login(user);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al realizar la operación'
      });
    }
  }
  async admin() {
    try {
      const user: User = {
        email: 'Leire.rins@example.com',
        pwd: '12345779',
      };
      await this.servicioAuth.login(user);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al realizar la operación'
      });
    }
  }

}
