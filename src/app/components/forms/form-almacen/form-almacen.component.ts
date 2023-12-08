import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { AlmacenService } from 'src/app/services/almacen.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-almacen',
  templateUrl: './form-almacen.component.html',
  styleUrls: ['./form-almacen.component.css'],
})
export class FormAlmacenComponent {
  almacenForm: FormGroup;
  almacenService = inject(AlmacenService);
  imagenesService = inject(ImagenesService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  uploadedImage: any;

  constructor() {
    this.almacenForm = new FormGroup({
      // idalmacen: new FormControl('', []),
      nombre_almacen: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40),
      ]),
      long: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(-?\d+(\.\d+)?)$/), // Longitud entre -180 y 180
        Validators.min(-180),
        Validators.max(180),
      ]),
      lat: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(-?\d+(\.\d+)?)$/), // Latitud entre -90 y 90
        Validators.min(-90),
        Validators.max(90),
      ]),
      activo: new FormControl('', [Validators.required]),
      imagen_almacen: new FormControl('Almacen0.jpg', []),
    });
  }

  // LÓGICA DEL FORMULARIO EXISTENTE O NUEVO
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      //SE NECESITA PARA GUARDAR LA IMAGEN Y TRAERLA
      let idalmacen: number = Number(params.idalmacen);

      if (idalmacen) {
        //GUARDO EL ID DE ALMACEN PARA GUARDAR LA IMAGEN POSTERIORENTE
        this.idAlmacen = idalmacen;
        //PINTAR ALMACEN EXISTENTE
        let response = await this.almacenService.getById(idalmacen);
        console.log(response);

        this.almacenForm = new FormGroup({
          idalmacen: new FormControl(response.idalmacen, []),
          nombre_almacen: new FormControl(response.nombre_almacen, [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(40),
          ]),
          long: new FormControl(response.long, [
            Validators.required,
            Validators.pattern(/^(-?\d+(\.\d+)?)$/), // Longitud entre -180 y 180
            Validators.min(-180),
            Validators.max(180),
          ]),
          lat: new FormControl(response.lat, [
            Validators.required,
            Validators.pattern(/^(-?\d+(\.\d+)?)$/), // Latitud entre -90 y 90
            Validators.min(-90),
            Validators.max(90),
          ]),
          activo: new FormControl(response.activo, [Validators.required]),
          imagen_almacen: new FormControl(response.imagen_almacen || 'imagen_almacen', []),
        });
      }
    });
  }

  async submitForm(): Promise<void> {
    if (this.almacenForm.value.idalmacen) {
      try {
        await Swal.fire({
          title: '¿Quiere guardar los cambios?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#FFC007',
          confirmButtonText: 'Guardar',
        }).then(async (result) => {
          if (result.isConfirmed) {
            // ACTUALIZACIÓN ALMACEN
            let response = await this.almacenService.updateAlmacen(this.almacenForm.value);
            console.log("Datos enviados a la API:", this.almacenForm.value);

            // Verificar si se ha cargado una nueva imagen antes de intentar guardarla
            if (this.imagenFile) {
              await this.guardarImagenAlmacen(this.imagenFile, this.almacenForm.value.idalmacen);
            } else if (
              this.almacenForm.get('imagen_almacen')?.value === 'imagen_almacen'
            ) {
              // Si la imagen no ha sido modificada, establecerla como undefined o eliminarla según la necesidad del backend
              this.almacenForm.removeControl('imagen_almacen');
            }
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Almacén actualizado correctamente',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        this.router.navigate(['/almacenes']);
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al actualizar el almacen',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      try {
        await Swal.fire({
          title: '¿Quiere crear el almacén?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#FFC007',
          confirmButtonText: 'Crear',
        }).then(async (result) => {
          if (result.isConfirmed) {
            console.log(this.almacenForm.value);
            // CREACIÓN NUEVO ALMACEN
            let response = await this.almacenService.create(this.almacenForm.value);
            // Esperamos a guardarImagen para que no cargue la default
            const nuevoAlmacenID = response.idalmacen;
            await this.guardarImagenAlmacen(this.imagenFile, nuevoAlmacenID);

            // TRATAR ERROR POR DUPLICADO
            console.log(response);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Almacén creado correctamente',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        this.router.navigate(['/almacenes']);
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

  checkControl(
    formcontrolName: string,
    validator: string
  ): boolean | undefined {
    return (
      this.almacenForm.get(formcontrolName)?.hasError(validator) &&
      this.almacenForm.get(formcontrolName)?.touched
    );
  }

  // TODO LO RELACIONADO CON LA IMAGEN, PRIMERO SE MUESTRA TRAS ELEGIRLA
  // AL PRESIONAR EN EL BOTÓN ACEPTAR SE ENVIA AL BACK
  url: any;
  imagenFile: File | undefined;
  idAlmacen:number | undefined;

  onChange(event: any) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };

    reader.onerror = (event: any) => {
      //TODO
      console.log('No se puede leer el fichero: ' + event.target.error.code);
    };
    reader.readAsDataURL(event.target.files[0]);
    this.imagenFile = event.target.files[0];
  }

  async guardarImagenAlmacen(imagenFile: File | undefined, idAlmacen: number | undefined) {
    if (imagenFile && idAlmacen) {
      await this.imagenesService.guardarImagenAlmacen(imagenFile, idAlmacen);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha seleccionado una imagen.',
        confirmButtonText: 'Aceptar',
      });
    }
  }

   // Método para convertir el valor del botón desplazable a 0 o 1
   toggleActivo() {
    const activoControl = this.almacenForm.get('activo');
    if (activoControl) {
      activoControl.setValue(activoControl.value === '1' ? '0' : '1');
    }
  }
}
