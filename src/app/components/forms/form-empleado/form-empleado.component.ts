import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { EmpleadoRespuesta } from 'src/app/models/Respuestas_API/empleadoRespuesta.interface';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css'],
})
export class FormEmpleadoComponent {
  empleadoForm: FormGroup;
  empleadosService = inject(EmpleadosService);
  imagenesService = inject(ImagenesService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  imagenEmpleado: File | undefined;
  idEmpleado: number | undefined;

  constructor() {
    this.empleadoForm = new FormGroup({
      num_empleado: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      apellidos: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      puesto: new FormControl('', [Validators.required]),
      fecha_contratacion: new FormControl('', [Validators.required]),
      idalmacen: new FormControl('', [Validators.required, Validators.min(1)]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(6)]),
      activo: new FormControl('', [Validators.required]),
      imagen_empleado: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      this.idEmpleado = params['id'];
      if (this.idEmpleado) {
        let empleado: EmpleadoRespuesta = await this.empleadosService.getEmpleadoById(+this.idEmpleado);
        this.empleadoForm.patchValue({
          ...empleado,
          activo: empleado.activo.toString(), // Convertir a string si es necesario
          fecha_contratacion: new Date(empleado.fecha_contratacion).toISOString().substring(0, 10), // Formatear la fecha
        });
        // Cargar imagen actual del empleado si es necesario
        // ...
      }
    });
  }

  async submitForm(): Promise<void> {
    if (this.empleadoForm.valid) {
      try {
        let result = await Swal.fire({
          title: '¿Confirmar acción?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#FFC007',
          confirmButtonText: 'Aceptar',
        });

        if (result.isConfirmed) {
          const empleadoData = this.empleadoForm.value;
          if (this.idEmpleado !== undefined) {
            // Actualizar empleado existente
            await this.empleadosService.updateEmpleadoEstado(this.idEmpleado, empleadoData.activo);
            if (this.imagenEmpleado) {
              await this.imagenesService.guardarImagenEmpleado(this.imagenEmpleado, this.idEmpleado);
            }
            Swal.fire('¡Actualizado!', 'El empleado ha sido actualizado.', 'success');
          } else {
            // Crear nuevo empleado
            console.log("Datos enviados a la API:", empleadoData);
            let response = await this.empleadosService.createEmpleado(empleadoData);
            this.idEmpleado = response.idEmpleado;
            if (this.imagenEmpleado && this.idEmpleado !== undefined) {
              await this.imagenesService.guardarImagenEmpleado(this.imagenEmpleado, this.idEmpleado);
            }
            Swal.fire('¡Creado!', 'El empleado ha sido creado.', 'success');
          }
          this.router.navigate(['/empleados']);
        }
      } catch (error) {
        Swal.fire('Error', 'Ha ocurrido un error durante la operación.', 'error');
      }
    }
  }

  checkControl(name: string, error: string): boolean | undefined {
    return (
      this.empleadoForm.get(name)?.hasError(error) &&
      this.empleadoForm.get(name)?.touched
    );
  }

  onChange(event: any) {
    if (event.target.files.length > 0) {
      this.imagenEmpleado = event.target.files[0];
    }
  }
  
}
