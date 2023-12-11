import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlmacenService } from 'src/app/services/almacen.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-almacen',
  templateUrl: './form-almacen.component.html',
  styleUrls: ['./form-almacen.component.css'],
})
export class FormAlmacenComponent {
  almacenService = inject(AlmacenService);
  imagenesService = inject(ImagenesService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  almacenForm: FormGroup;
  uploadedImage: any;
  showFileBox: boolean = true;
  updateImgAlmacen: string = 'response.imagen_almacen';
  modo: 'create' | 'update' = 'create';

  constructor() {
    this.almacenForm = new FormGroup({
      nombre_almacen: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40),
      ]),
      long: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(-?\d+(\.\d+)?)$/),
        Validators.min(-180),
        Validators.max(180),
      ]),
      lat: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(-?\d+(\.\d+)?)$/),
        Validators.min(-90),
        Validators.max(90),
      ]),
      activo: new FormControl('', [Validators.required]),
      imagen_almacen: new FormControl('Almacen0.jpg', []),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let idalmacen: number = Number(params.idalmacen);

      if (idalmacen) {
        this.showFileBox = false;
        this.modo = 'update';
        this.idAlmacen = idalmacen;
        let response = await this.almacenService.getById(idalmacen);
        this.updateImgAlmacen = this.imagenesService.getImagenAlmacen(response.imagen_almacen);

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
          imagen_almacen: new FormControl(response.imagen_almacen || 'Almacen0,jpg', []),
        });
      }
    });
  }

  async submitForm(): Promise<void> {
      if (this.almacenForm.value.idalmacen && this.imagenFile) {
        try {
          await Swal.fire({
            title: '¿Quiere guardar los cambios?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#dc3545',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#157347',
          confirmButtonText: 'Guardar',
          }).then(async (result) => {
            if (result.isConfirmed) {
              let response = await this.almacenService.updateAlmacen(this.almacenForm.value);
              if(!this.showFileBox){
                await this.guardarImagenAlmacen(this.imagenFile, this.almacenForm.value.idalmacen);
              } else {
                this.showFileBox = true;
              }
              this.showFileBox = true;
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
            cancelButtonColor: '#dc3545',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#157347',
            confirmButtonText: 'Crear',
          }).then(async (result) => {
            if (result.isConfirmed) {
              let response = await this.almacenService.create(this.almacenForm.value);
              const nuevoAlmacenID = response.idalmacen;
              await this.guardarImagenAlmacen(this.imagenFile, nuevoAlmacenID || 0);
              this.showFileBox = true;
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

  url: any;
  public imagenFile: File | undefined;
  idAlmacen:number | undefined;

  onChange(event: any) {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
    };

    reader.onerror = (event: any) => {
      console.log('No se puede leer el fichero: ' + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);
    this.imagenFile = event.target.files[0];
    this.showFileBox = false;
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
        confirmButtonColor: '#157347',
      });
    }
  }

   toggleActivo() {
    const activoControl = this.almacenForm.get('activo');
    if (activoControl) {
      activoControl.setValue(activoControl.value === '1' ? '0' : '1');
    }
  }

  refrescarImagen() {
    this.showFileBox = true;
    this.url = null;
  }
}
