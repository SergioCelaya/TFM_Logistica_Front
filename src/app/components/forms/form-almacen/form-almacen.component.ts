import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlmacenService } from 'src/app/services/almacen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-almacen',
  templateUrl: './form-almacen.component.html',
  styleUrls: ['./form-almacen.component.css']
})
export class FormAlmacenComponent {

  almacenForm: FormGroup;
  almacenService = inject(AlmacenService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  buttonText: string = 'Registrar almacén';

  constructor(){
    this.almacenForm = new FormGroup({
      // idalmacen: new FormControl('', []),
      nombre_almacen: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ]),
      long: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(-?\d+(\.\d+)?)$/), // Longitud entre -180 y 180
        Validators.min(-180),
        Validators.max(180)
      ]),
      lat: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(-?\d+(\.\d+)?)$/), // Latitud entre -90 y 90
        Validators.min(-90),
        Validators.max(90)
      ]),
      activo: new FormControl('', [Validators.required]),
      imagen_almacen: new FormControl('', [Validators.required])
    });
  }

  // LÓGICA DEL FORMULARIO EXISTENTE O NUEVO
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(async (params: any) => {
      let idAlmacen: number = Number(params.idalmacen);

      if (idAlmacen) {
        //PINTAR ALMACEN EXISTENTE
        let response = await this.almacenService.getById(idAlmacen);

        this.almacenForm = new FormGroup({
          idAlmacen: new FormControl(idAlmacen, []),
          nombre_almacen: new FormControl(response.nombre_almacen, [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(40)
          ]),
          long: new FormControl(response.long, [
            Validators.required,
            Validators.pattern(/^(-?\d+(\.\d+)?)$/), // Longitud entre -180 y 180
            Validators.min(-180),
            Validators.max(180)
          ]),
          lat: new FormControl(response.lat, [
            Validators.required,
            Validators.pattern(/^(-?\d+(\.\d+)?)$/), // Latitud entre -90 y 90
            Validators.min(-90),
            Validators.max(90)
          ]),
          activo: new FormControl(response.activo, [Validators.required]),
          imagen_almacen: new FormControl(response.imagen_almacen, [Validators.required])
      })
      this.buttonText = 'Actualizar almacén';
      }
  });
}

async submitForm(): Promise<void> {
  try {
    if (this.almacenForm.value.idAlmacen) {
      // ACTUALIZACIÓN ALMACEN
      let response = await this.almacenService.updateAlmacen(this.almacenForm.value);
      if (response) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Almacén actualizado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/almacenes']);
      } else {
        throw new Error('Error al actualizar el almacén');
      }
    } else {
      // CREACIÓN NUEVO ALMACEN
      let response = await this.almacenService.create(this.almacenForm.value);
      if (response) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Almacén creado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(this.almacenForm.value);
        this.router.navigate(['/almacenes']);
      } else {
        throw new Error('Error al crear el almacén');
      }
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Error en la operación',
      showConfirmButton: false,
      timer: 1500
    });
  }
}

checkControl(formcontrolName: string, validator: string): boolean | undefined {
  return this.almacenForm.get(formcontrolName)?.hasError(validator) && this.almacenForm.get(formcontrolName)?.touched;
}

}
