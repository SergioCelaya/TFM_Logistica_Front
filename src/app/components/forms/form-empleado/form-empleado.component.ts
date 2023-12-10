import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { EmpleadoRespuesta } from 'src/app/models/Respuestas_API/empleadoRespuesta.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css'],
})
export class FormEmpleadoComponent {
  activatedRoute = inject(ActivatedRoute);
  empleadosService = inject(EmpleadosService);
  imagenesService = inject (ImagenesService);
  router = inject(Router);


  empleadoForm: FormGroup;
  imagenEmpleado: File | undefined;
  updateEmpleado: string = 'response.imagen_empleado';
  showFileBox: boolean = true; // Controla la visualización del área de carga de imagen
  modo: 'create' | 'update' = 'create';
  showPassword: boolean = false;

  imagenEmpleadoUrl: string | ArrayBuffer | null = null; // URL para previsualizar la imagen

  constructor() {
    this.empleadoForm = new FormGroup({
      num_empleado: new FormControl('', [
        Validators.required,
        Validators.maxLength(45),
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.maxLength(45),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(45),
      ]),
      puesto: new FormControl('', [Validators.required]),
      fecha_contratacion: new FormControl('', [Validators.required]),
      idalmacen: new FormControl('', [
        Validators.required,
        Validators.min(1)
      ]),
      pwd: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),
      activo: new FormControl('', [Validators.required]),
      imagen_empleado: new FormControl('090057.jpg', []),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let idempleado: number = Number(params.idempleado);
      console.log(idempleado);

      if(idempleado){
        this.showFileBox = false;
        this.modo = 'update';

        this.idEmpleado = idempleado;

        let response = await this.empleadosService.getEmpleadoById(idempleado);
        console.log(response);

        this.updateEmpleado = this.imagenesService.getImagenEmpleado(response.imagen_empleado);
        console.log(this.updateEmpleado);

        this.empleadoForm = new FormGroup({
          idempleado: new FormControl(response.idempleado, []),
          num_empleado: new FormControl(response.num_empleado, [
            Validators.required,
            Validators.maxLength(45),
          ]),
          nombre: new FormControl(response.nombre, [
            Validators.required,
            Validators.maxLength(20),
          ]),
          apellidos: new FormControl(response.apellidos, [
            Validators.required,
            Validators.maxLength(45),
          ]),
          email: new FormControl(response.email, [
            Validators.required,
            Validators.email,
            Validators.maxLength(45),
          ]),
          puesto: new FormControl(this.translatePuestoFromServer(response.puesto), [Validators.required]),
          fecha_contratacion: new FormControl(new Date(response.fecha_contratacion).toISOString().substring(0, 10), [Validators.required]),
          idalmacen: new FormControl(response.idalmacen, [
            Validators.required,
            Validators.min(1)
          ]),
          pwd: new FormControl(response.pwd, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(100),
          ]),
          activo: new FormControl(response.activo, [Validators.required]),
          imagen_empleado: new FormControl(response.imagen_empleado || 'imagen_empleado', []),
        });

      }
    })
  }

  async submitForm(): Promise<void> {
    if(this.url && !this.showFileBox) {
      if (this.empleadoForm.value.idempleado) {
        try {
          await Swal.fire({
            title: '¿Quiere guardar los cambios?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#FFC007',
            confirmButtonText: 'Guardar',
          }).then(async (result) => {
            if (result.isConfirmed) {

              let response = await this.empleadosService.updateEmpleado(this.empleadoForm.value.idempleado, this.empleadoForm.value);
              console.log("Datos enviados a la API:", this.empleadoForm.value);

              // Verificar si se ha cargado una nueva imagen antes de intentar guardarla
              if (this.imagenFile) {
                await this.guardarImagenEmpleado(this.imagenFile, this.empleadoForm.value.idempleado);
              } else if (
                this.empleadoForm.get('imagen_empleado')?.value === 'imagen_empleado'
              ) {
                // Si la imagen no ha sido modificada, establecerla como undefined o eliminarla según la necesidad del backend
                this.empleadoForm.removeControl('imagen_empleado');
              }
              this.showFileBox = true;
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Empleado actualizado correctamente',
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
          this.router.navigate(['/empleados']);
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
                title: '¿Quiere crear un nuevo empleado?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#FFC007',
                confirmButtonText: 'Crear',
              }).then(async (result) => {
                if (result.isConfirmed) {
                  console.log(this.empleadoForm.value);
                  // CREACIÓN NUEVO ALMACEN
                  let response = await this.empleadosService.createEmpleado(this.empleadoForm.value);
                  // Esperamos a guardarImagen para que no cargue la default
                  const nuevoEmpleadoID = response.idempleado;
                  console.log(nuevoEmpleadoID);
                  await this.guardarImagenEmpleado(this.imagenFile, nuevoEmpleadoID);
                  console.log(response);

                  this.showFileBox = true;
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Empleado creado correctamente',
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
              this.router.navigate(['/empleados']);
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
        } else {
          this.showFileBox = true;
        }
  }


  checkControl(
    formcontrolName: string,
    validator: string
  ): boolean | undefined {
    return (
      this.empleadoForm.get(formcontrolName)?.hasError(validator) &&
      this.empleadoForm.get(formcontrolName)?.touched
    );
  }

  // AL PRESIONAR EN EL BOTÓN ACEPTAR SE ENVIA AL BACK
  url: any;
  imagenFile: File | undefined;
  idEmpleado:number | undefined;

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
    this.showFileBox = false; //Ocultar bloque al cargar imagen
  }

  async guardarImagenEmpleado(imagenFile: File | undefined, idEmpleado: number | undefined) {
    if (imagenFile && idEmpleado) {
      await this.imagenesService.guardarImagenEmpleado(imagenFile, idEmpleado);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha seleccionado una imagen.',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  translatePuestoFromServer(value: any){
    switch (value) {
      case 'Empleado':
        return '1';
      case 'Encargado':
        return '2';
      case 'Administrador':
        return '3';
      default:
        return '1';
    }
  }

  refrescarImagen(): void {
    this.showFileBox = true; // Muestra de nuevo el área de carga
    this.url = null; // Resetea la previsualización
    // También puedes resetear el valor del control de formulario relacionado con la imagen si es necesario
    this.empleadoForm.get('imagen_empleado')?.setValue(null);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
