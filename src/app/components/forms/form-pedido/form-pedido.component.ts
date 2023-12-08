import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoRespuesta } from 'src/app/models/Respuestas_API/empleadoRespuesta.interface';
import { pedidoRespuesta } from 'src/app/models/Respuestas_API/pedidosRespuesta.interface';
import { Almacen } from 'src/app/models/almacen.interface';
import { Empleado } from 'src/app/models/empleado.interface';
import { AlmacenService } from 'src/app/services/almacen.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-pedido',
  templateUrl: './form-pedido.component.html',
  styleUrls: ['./form-pedido.component.css'],
})
export class FormPedidoComponent {
  servicioAlmacenes = inject(AlmacenService);
  servicioEmpleados = inject(EmpleadosService);
  servicioPedido = inject(PedidosService);
  servicioAuth = inject(AuthService);
  servicioImagenes = inject(ImagenesService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  almacenesOrigen: Almacen[] = [];
  almacenesDestino: Almacen[] = [];
  empleados: EmpleadoRespuesta[] = [];
  encargados: EmpleadoRespuesta[] = [];
  pedidoForm: FormGroup<any>;
  //Variables de control de flujo del pedido.
  crearPedido:boolean = false;
  accionValidar: boolean = false;
  accionRectificar: boolean = false;
  accionEnvio: boolean = false;
  accionPteValidar: boolean = false;
  accionRecepcion: boolean = false;
  accionIncidencia: boolean = false;
  pedidoActivo: pedidoRespuesta | null = null;
  urlImagen: string = '';

  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      let idPedido: number = Number(params.idpedido);
      if (idPedido) {
        let respuesta: pedidoRespuesta[] | null = null;
        let pedido: pedidoRespuesta | null;
        try {
          respuesta = await this.servicioPedido.getPedidoById(idPedido);
        } catch (Error) {
          Swal.fire({
            icon: 'error',
            title: 'Error al obtener el pedido. Consulte con el administrador.',
          });
        }
        pedido = respuesta![0];
        this.pedidoActivo = pedido;
        this.pedidoForm = new FormGroup({
          idPedido: new FormControl(pedido.idPedido, []),
          numero_pedido: new FormControl(pedido.numero_pedido, [
            Validators.required,
            Validators.min(0),
            Validators.maxLength(10),
          ]),
          fecha_creacion: new FormControl(
            pedido.fecha_creacion.toString().split('T')[0],
            [Validators.required]
          ),
          fecha_entrega: new FormControl(
            pedido.fecha_entrega.toString().split('T')[0],
            [Validators.required]
          ),
          almacen_origen: new FormControl(pedido.almacen_origen, [
            Validators.required,
          ]),
          almacen_destino: new FormControl(pedido.almacen_destino, [
            Validators.required,
          ]),
          usuario_asignado: new FormControl(
            pedido.usuario_asignado.idempleado,
            []
          ),
          usuario_responsable: new FormControl(
            pedido.usuario_responsable.idempleado,
            []
          ),
          estado: new FormControl(this.obtenerEstadoNumerico(pedido.estado), [
            Validators.required,
          ]),
          id_transporte: new FormControl(pedido.id_transporte, []),
          detalle_pedido: new FormControl(pedido.detalle_pedido, [
            Validators.required,
          ]),
        });
      }
      try {
        let empleado: Empleado = this.inicializacionEmpleado();
        empleado = await this.servicioAuth.getUser();
        this.almacenesOrigen = await this.servicioAlmacenes.getAll();
        this.almacenesDestino = this.almacenesOrigen;
        this.empleados =
          await this.servicioEmpleados.getEmpleadosByPuestoSinPaginar(1);
        this.encargados =
          await this.servicioEmpleados.getEmpleadosByPuestoAlmacenSinPaginar(
            2,
            empleado.idalmacen
          );
      } catch (Error) {
        Swal.fire({
          icon: 'error',
          title:
            'Error al inicializar el formulario. Consulte con el administrador.',
        });
      }
      this.controlDeRolesYestados();
      console.log("estao: ")
      console.log(this.pedidoActivo?.estado)
      if (this.pedidoActivo?.estado) {
        this.setImagenEstado(this.pedidoActivo?.estado);
      }else{
        this.crearPedido = true;
        this.urlImagen = 'assets/estados/crear.jpg';
      }
    });
  }

  private setImagenEstado(estado: string) {
    switch (estado) {
      case 'Pendiente validar':
        this.urlImagen ='assets/estados/pendienteRevisar.jpg';
        break;
      case 'Rectificar':
        this.urlImagen = 'assets/estados/rectificar.jpg';
        break;
      case 'Validado':
        this.urlImagen = 'assets/estados/validado.jpg';
        break;
      case 'Pendiente recepcionar':
        this.urlImagen = 'assets/estados/pendienteRecepcionar.jpg';
        break;
      case 'Finalizado':
        this.urlImagen = 'assets/estados/finalizado.jpg';
        break;
        case 'En tránsito':
        this.urlImagen = 'assets/estados/enTransito.jpg';
        break;
      default:
        this.urlImagen = 'assets/estados/crear.jpg';
        break;
    }
  }

  private async controlDeRolesYestados() {
    let empleado: Empleado = this.inicializacionEmpleado();
    try {
      empleado = await this.servicioAuth.getUser();
    } catch (Error) {
      Swal.fire({
        icon: 'error',
        title:
          'Error al obtener al usuario logado. Consulte con el administrador.',
      });
    }
    if (this.pedidoActivo) {
      if (empleado.puesto == 'Encargado') {
        this.pedidoForm.disable();
        if (this.pedidoActivo.almacen_origen == empleado.idalmacen) {
          this.accionValidar = true;
          this.accionRectificar = true;
        } else if (this.pedidoActivo.almacen_destino == empleado.idalmacen) {
          this.accionRecepcion = true;
        }
      } else if (empleado.puesto == 'Empleado') {
        if (
          this.pedidoActivo.usuario_asignado.idempleado == empleado.idempleado
        ) {
          if (this.pedidoActivo.estado == 'Rectificar') {
            this.accionPteValidar = true;
          } else if (this.pedidoActivo.estado == 'Validado') {
            this.pedidoForm.disable();
            this.accionEnvio = true;
          } else {
            this.pedidoForm.disable();
          }
        }
      }
    }
  }

  private inicializacionEmpleado(): Empleado {
    const emp: Empleado = {
      idempleado: 0,
      num_empleado: '',
      nombre: '',
      apellidos: '',
      email: '',
      puesto: '',
      activo: false,
      fecha_contratacion: new Date(),
      idalmacen: 0,
      pwd: '',
      imagen_empleado: '',
    };
    return emp;
  }

  private obtenerEstadoNumerico(estado: string): number {
    switch (estado) {
      case 'Pendiente validar':
        return 1;
      case 'Rectificar':
        return 2;
      case 'Validado':
        return 3;
      case 'En tránsito':
        return 4;
      case 'Pendiente recepcionar':
        return 5;
      case 'Finalizado':
        return 6;
      default:
        return 0;
    }
  }

  constructor() {
    this.pedidoForm = new FormGroup({
      numero_pedido: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.maxLength(10),
      ]),
      fecha_creacion: new FormControl('', [Validators.required]),
      fecha_entrega: new FormControl('', [Validators.required]),
      almacen_origen: new FormControl('', [Validators.required]),
      almacen_destino: new FormControl('', [Validators.required]),
      usuario_asignado: new FormControl('', []),
      usuario_responsable: new FormControl('', []),
      estado: new FormControl('', [Validators.required]),
      id_transporte: new FormControl('', []),
      detalle_pedido: new FormControl('', [Validators.required]),
    });
    if (this.pedidoActivo?.estado) {
      this.setImagenEstado('crear');
    }
  }

  async submitForm() {
    if (this.pedidoForm.value.idPedido) {
      try {
        await Swal.fire({
          title: '¿Quiere guardar los cambios?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#FFC007',
          confirmButtonText: 'Guardar',
        }).then((result) => {
          if (result.isConfirmed) {
            // ACTUALIZACIÓN ALMACEN
            let response = this.servicioPedido.updatePedido(
              this.pedidoForm.value
            );
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Pedido actualizado correctamente',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        this.router.navigate(['/pedidos']);
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
          title: '¿Quiere crear el pedido?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#FFC007',
          confirmButtonText: 'Crear',
        }).then((result) => {
          if (result.isConfirmed) {
            let response: any = this.servicioPedido.createPedido(
              this.pedidoForm.value
            );
            if (!response.idPedido) {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Ha habido un error.',
                showConfirmButton: false,
                timer: 1500,
              });
            }
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Pedido creado correctamente',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
        this.router.navigate(['/pedidos']);
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
      this.pedidoForm.get(formcontrolName)?.hasError(validator) &&
      this.pedidoForm.get(formcontrolName)?.touched
    );
  }

  toValido() {
    try {
      if (this.pedidoActivo?.idPedido) {
        this.servicioPedido.toValidado(this.pedidoActivo?.idPedido);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pedido validado.',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/pedidos/']);
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ha habido un error cambiando el estado del pedido.',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/pedidos/']);
    }
  }

  toPendienteValidar() {
    try {
      if (this.pedidoActivo?.idPedido) {
        this.servicioPedido.toPendientevalidar(this.pedidoActivo?.idPedido);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pedido pendiente de confirmar',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/pedidos/']);
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ha habido un error cambiando el estado del pedido.',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/pedidos/']);
    }
  }

  toRectificar() {
    try {
      if (this.pedidoActivo?.idPedido) {
        this.servicioPedido.toRectificar(this.pedidoActivo?.idPedido);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pedido pasado a rectificar',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/pedidos/']);
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ha habido un error cambiando el estado del pedido.',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/pedidos/']);
    }
  }

  toRecepcionar() {
    try {
      if (this.pedidoActivo?.idPedido) {
        this.servicioPedido.toFinalizado(this.pedidoActivo?.idPedido);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pedido recepcionado.',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/pedidos/']);
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ha habido un error cambiando el estado del pedido.',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/pedidos/']);
    }
  }
  toEnviar() {
    try {
      if (this.pedidoActivo?.idPedido) {
        this.servicioPedido.toEnTransito(this.pedidoActivo?.idPedido);
        this.servicioPedido.toPendienteRecepcionar(this.pedidoActivo?.idPedido);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Pedido en tránsito, pasara a ser recepcioanado.',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/pedidos/']);
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ha habido un error cambiando el estado del pedido.',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/pedidos/']);
    }
  }

  almacenOrigenDistintoDestino(control: AbstractControl) {
    if (
      this.pedidoForm.controls['amacen_origen'].value &&
      this.pedidoForm.controls['amacen_origen'].value != control.value
    ) {
      return { almacenOrigenDistintoDestino: true };
    }
    return null;
  }
  volverPedidos() {
    this.router.navigate(['/pedidos/']);
  }
}
