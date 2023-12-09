import { Component } from '@angular/core';
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
  empleadoForm: FormGroup;
  idEmpleado: number | undefined;
  imagenEmpleado: File | undefined;

  constructor(
    private empleadosService: EmpleadosService,
    private imagenesService: ImagenesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
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
      imagen_empleado: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params['id'] && params['id'] !== 'nuevo') {
        this.idEmpleado = +params['id'];
        try {
          let empleado: EmpleadoRespuesta = await this.empleadosService.getEmpleadoById(this.idEmpleado);
          this.empleadoForm.patchValue({
            ...empleado,
            fecha_contratacion: new Date(empleado.fecha_contratacion).toISOString().substring(0, 10),
          });
        } catch (error) {
          console.error('Error al obtener datos del empleado:', error);
        }
      } else {
        this.idEmpleado = undefined;
        this.empleadoForm.reset();
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
          empleadoData.puesto = +empleadoData.puesto;
  
          if (this.idEmpleado !== undefined) {
            await this.empleadosService.updateEmpleado(this.idEmpleado, empleadoData);
  
            if (this.imagenEmpleado) {
              await this.imagenesService.guardarImagenEmpleado(this.imagenEmpleado, this.idEmpleado);
            }
            Swal.fire('¡Actualizado!', 'El empleado ha sido actualizado.', 'success');
          } else {
            delete empleadoData.idEmpleado;
            const response = await this.empleadosService.createEmpleado(empleadoData);
  
            if (!response.idEmpleado) {
              console.error(response.fatal);
            }
  
            this.idEmpleado = response.idEmpleado;
            if (this.imagenEmpleado && this.idEmpleado) {
              await this.imagenesService.guardarImagenEmpleado(this.imagenEmpleado, this.idEmpleado);
            }
            Swal.fire('¡Creado!', 'El empleado ha sido creado.', 'success');
          }
          this.router.navigate(['/empleados']);
        }
      } catch (error) {
        console.error('Error durante la operación:', error);
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