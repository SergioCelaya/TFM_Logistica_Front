import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmpleadosService } from 'src/app/services/empleados.service';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css'],
})
export class FormEmpleadoComponent implements OnInit {
  empleadoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private empleadosService: EmpleadosService
  ) {}

  ngOnInit(): void {
    this.empleadoForm = this.fb.group({
      num_empleado: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      apellidos: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      puesto: ['', [Validators.required]],
      fecha_contratacion: ['', [Validators.required]],
      idalmacen: ['', [Validators.required, Validators.min(1)]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      activo: ['', [Validators.required]],
      imagen_empleado: [null], // La validación dependerá de tus requerimientos
      // Más campos según sea necesario
    });

    const empleadoId = this.route.snapshot.paramMap.get('id');
    if (empleadoId) {
      this.empleadosService.getEmpleadoById(+empleadoId).then((empleado) => {
        this.empleadoForm.patchValue(empleado);
      });
    }
  }

  submitForm(): void {
    if (this.empleadoForm.valid) {
      const empleadoData = this.empleadoForm.value;
      const empleadoId = this.route.snapshot.paramMap.get('id');

      if (empleadoId) {
        // Actualizar empleado existente
        this.empleadosService
          .updateEmpleadoEstado(+empleadoId, empleadoData.activo)
          .then(/* ... manejo del éxito ... */)
          .catch(/* ... manejo del error ... */);
        // Si necesitas actualizar otros datos, como el almacén, hazlo aquí
      } else {
        // Crear nuevo empleado
        this.empleadosService
          .createEmpleado(empleadoData)
          .then(/* ... manejo del éxito ... */)
          .catch(/* ... manejo del error ... */);
      }
    }
  }

  // Método para verificar el estado de un control específico
  checkControl(name: string, error: string) {
    return (
      this.empleadoForm.controls[name].hasError(error) &&
      (this.empleadoForm.controls[name].dirty ||
        this.empleadoForm.controls[name].touched)
    );
  }
}
