import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-pedido',
  templateUrl: './form-pedido.component.html',
  styleUrls: ['./form-pedido.component.css']
})
export class FormPedidoComponent {
  pedidoForm: FormGroup;
  constructor(){
    this.pedidoForm = new FormGroup({

    });
  }

  submitForm(){

  }

  checkControl(
    formcontrolName: string,
    validator: string
  ): boolean | undefined {
    return (
      this.pedidoForm.get(formcontrolName)?.hasError(validator) &&
      this.pedidoForm.get(formcontrolName)?.touched
    );
  }

  /*fechaValida() {
    const fechaSeleccionada = new Date(fecha.value);
    const fechaActual = new Date();

    // Compara la fecha seleccionada con la fecha actual
    if (fechaSeleccionada < fechaActual) {
      return { fechaInvalida: true };
    }

    return null;
  }*/
}
