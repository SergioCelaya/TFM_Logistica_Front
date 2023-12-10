import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidenciasService } from 'src/app/services/incidencias.service';
import Swal from 'sweetalert2';
import { allIncidencia } from 'src/app/models/Respuestas_API/allIncidencias.interface';

@Component({
  selector: 'app-form-incidencias',
  templateUrl: './form-incidencias.component.html',
  styleUrls: ['./form-incidencias.component.css'],
})
export class FormIncidenciasComponent {
  incidenciasForm: FormGroup;
  IncidenciasService = inject(IncidenciasService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  idIncidencia: number | undefined;
  Resultado: allIncidencia | null = null;
  modo:string = "create";

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

      tipo_incidencia: new FormControl('', [Validators.required]),

      idIncidencia: new FormControl('', []),

      idpedido_asociado: new FormControl('', [Validators.required]),

      vista: new FormControl('', [Validators.required]),
    });
  }

  //basado en form Almacen.
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (params: any) => {
      //SE NECESITA PARA GUARDAR LA IMAGEN Y TRAERLA
      let idincidencia: number = Number(params.idincidencia);
      
      if (idincidencia) {
        this.modo = 'update';
        //GUARDO EL ID DE INCIDENCIA PARA GUARDAR LA IMAGEN POSTERIORENTE
        this.idIncidencia = idincidencia;
        console.log(idincidencia);
        //PINTAR INCIDENCIA EXISTENTE
        let response = await this.IncidenciasService.getById(idincidencia);
        console.log(response);

        this.incidenciasForm = new FormGroup({
          idincidencia: new FormControl(response.idincidencia, []),
          titulo: new FormControl(response.titulo, [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(40),
          ]),

          descripcion: new FormControl(response.descripcion, [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(450),
          ]),

          tipo_incidencia: new FormControl(response.tipo_incidencia, [
            Validators.required,
          ]),

          idIncidencia: new FormControl(response.idincidencia, []),

          idpedido_asociado: new FormControl(response.idpedido_asociado, [
            Validators.required,
          ]),

          vista: new FormControl(response.vista, [Validators.required]),
        });
      }
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
    console.log(this.incidenciasForm.value);
    if (this.incidenciasForm.value.idIncidencia) {
      try {
        await Swal.fire({
          title: '¿Quiere guardar los cambios?',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#dc3545',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#157347',
          confirmButtonText: 'Guardar'
        }).then((result) => {
          if (result.isConfirmed) {
            // ACTUALIZACIÓN INCIDENCIA
            let response: any = null;
            response = this.IncidenciasService.updateIncidencia(
              this.incidenciasForm.value
            );
            if (response.Error) {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error al actualizar la incidencia',
                showConfirmButton: false,
                timer: 1500,
              });
            }
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
          cancelButtonColor: '#dc3545',
          cancelButtonText: 'Cancelar',
          confirmButtonColor: '#157347',
          confirmButtonText: 'Crear',
        }).then((result) => {
          if (result.isConfirmed) {
            // CREACIÓN NUEVO INCIDENCIA

            let response = this.IncidenciasService.create(
              this.incidenciasForm.value
            );

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
