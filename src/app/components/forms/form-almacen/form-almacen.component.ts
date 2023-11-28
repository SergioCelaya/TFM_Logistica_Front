import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
//import { AlmacenService } from 'src/app/services/almacen.service'; // SERVICIO ALMACEN
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-almacen',
  templateUrl: './form-almacen.component.html',
  styleUrls: ['./form-almacen.component.css']
})
export class FormAlmacenComponent {
  almacenForm: FormGroup;
  //almacenService = inject(AlmacenService);

  constructor(){
    this.almacenForm = new FormGroup({
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
      activo: new FormControl('', [Validators.required])
    });
  }

  //LÓGICA DEL FORMULARIO EXISTENTE O NUEVO
  // ngOnInit(): void {
  //   this.activatedRoute.params.subscribe(async (params: any) => {
  //     const idAlmacen: string = String(params.idalmacen);

  //     if (idAlmacen) {
  //       //PINTAR ALMACEN EXISTENTE
  //       const almacenData = await this.almacenService.getById(idAlmacen);
  //       const almacenData = { /* datos obtenidos del servicio */ };

  //       this.almacenForm.setValue({
  //         nombre_almacen: almacenData.nombre_almacen,
  //         long: almacenData.long,
  //         lat: almacenData.lat,
  //         activo: almacenData.activo
  //       });
  //     }
  //   });
  // }

  // submitForm(): void {
  //   if (this.almacenForm.value._id) {
  //     //ACTUALIZACIÓN ALMACEN
  //     this.almacenService.update(this.almacenForm.value).subscribe(
  //       response => {
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'success',
  //           title: 'Almacén actualizado correctamente',
  //           showConfirmButton: false,
  //           timer: 1500
  //         });
  //       },
  //       error => {
  //         console.error(error);
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'error',
  //           title: 'Error al actualizar el almacén',
  //           showConfirmButton: false,
  //           timer: 1500
  //         });
  //       }
  //     );
  //   } else {
  //     //CREACIÓN NUEVO ALMACEN
  //     this.almacenService.create(this.almacenForm.value).subscribe(
  //       response => {
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'success',
  //           title: 'Almacén creado correctamente',
  //           showConfirmButton: false,
  //           timer: 1500
  //         });
  //       },
  //       error => {
  //         console.error(error);
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'error',
  //           title: 'Error al crear el almacén',
  //           showConfirmButton: false,
  //           timer: 1500
  //         });
  //       }
  //     );
  //   }
  // }

  checkControl(formcontrolName: string, validator: string): boolean | undefined {
    return this.almacenForm.get(formcontrolName)?.hasError(validator) && this.almacenForm.get(formcontrolName)?.touched;
  }

}
