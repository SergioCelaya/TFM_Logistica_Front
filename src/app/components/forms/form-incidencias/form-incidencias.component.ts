import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-incidencias',
  templateUrl: './form-incidencias.component.html',
  styleUrls: ['./form-incidencias.component.css']
})
export class FormIncidenciasComponent {
  incidenciasForm: FormGroup;
  IncidenciasService = inject(IncidenciasService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  constructor() {
    this.incidenciasForm = new FormGroup({
      // idalmacen: new FormControl('', []),
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40),
      ]),

      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(450),
      ]),

      tipo_incidencia: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40),
      ]),

    
      
    });
  }

  checkControl(
    formcontrolName: string,
    validator: string
  ): boolean | undefined {
    return (
      this.incidenciasForm.get(formcontrolName)?.hasError(validator) &&
      this.incidenciasForm.get(formcontrolName)?.touched
    );
  }


  async submitForm(): Promise<void> {
    if (this.incidenciasForm.value.idIncidencia) {
      try {
        await Swal.fire({
          title: '¿Quiere guardar los cambios?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#FFC007',
          confirmButtonText: 'Guardar',
        }).then((result) => {
          if (result.isConfirmed) {
            // ACTUALIZACIÓN INCIDENCIA
            console.log("update incidencia");
            let response = this.IncidenciasService.updateIncidencia(
              this.incidenciasForm.value
            );
    
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Incidencia actualizada correctamente',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        this.router.navigate(['/incidencias']);
        console.log(this.incidenciasForm.value);
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al actualizar la incidencia',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      try {
        await Swal.fire({
          title: '¿Quiere crear la incidencia?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#FFC007',
          confirmButtonText: 'Crear',
        }).then((result) => {
          if (result.isConfirmed) {
            // CREACIÓN NUEVO INCIDENCIA
            console.log("create incidencia");
            let response = this.IncidenciasService.create(this.incidenciasForm.value);
            console.log(this.incidenciasForm.value);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Incidencia creada correctamente',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        this.router.navigate(['/incidencias']);
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ha habido un error, inténtelo de nuevo',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  }
}
