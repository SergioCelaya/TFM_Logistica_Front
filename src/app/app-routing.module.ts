import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { IncidenciasComponent } from './pages/incidencias/incidencias.component';
import { AlmacenesComponent } from './pages/almacenes/almacenes.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { FormAlmacenComponent } from './components/forms/form-almacen/form-almacen.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { FormPedidoComponent } from './components/forms/form-pedido/form-pedido.component';
import { FormIncidenciasComponent } from './components/forms/form-incidencias/form-incidencias.component';
import { IncidenciaComponent } from './components/incidencia/incidencia.component';
import { FormEmpleadoComponent } from './components/forms/form-empleado/form-empleado.component';
import { NewIncidenciaComponent } from './components/new-incidencia/new-incidencia.component';
import { AdminGuardService } from './guards/administrador.guard';
import { EncargadoGuardService } from './guards/encargado.guard';
import { EmpleadoGuardService } from './guards/empleado.guard';
import { CombinadoGuardService } from './guards/combinado.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirecciona a /login por defecto
  { path: 'login', component: LoginComponent },
  { path: 'pedidos', component: PedidosComponent, canActivate: [CombinadoGuardService]},
  { path: 'gestionPedido', component: FormPedidoComponent, canActivate: [EmpleadoGuardService] },
  { path: 'gestionPedido/:idpedido', component: FormPedidoComponent, canActivate: [EmpleadoGuardService] },
  { path: 'incidencias', component: IncidenciasComponent, canActivate: [CombinadoGuardService] },
  { path: 'nuevaIncidencia', component: FormIncidenciasComponent, canActivate: [CombinadoGuardService] },
  { path: 'editarIncidencia/:idincidencia', component: FormIncidenciasComponent, canActivate: [CombinadoGuardService] },
  { path: 'newIncidencia', component: NewIncidenciaComponent, canActivate: [CombinadoGuardService] },
  { path: 'almacenes', component: AlmacenesComponent, canActivate: [AdminGuardService] },
  { path: 'nuevoAlmacen', component: FormAlmacenComponent, canActivate: [AdminGuardService] },
  { path: 'updateAlmacen/:idalmacen', component: FormAlmacenComponent, canActivate: [AdminGuardService] },
  { path: 'empleados', component: EmpleadosComponent, canActivate: [AdminGuardService] },
  { path: 'empleado/nuevo', component: FormEmpleadoComponent, canActivate: [AdminGuardService] },
  { path: 'empleado/editar/:idempleado', component: FormEmpleadoComponent, canActivate: [AdminGuardService] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirecciona a /login por defecto
  { path: '**', redirectTo: '/login' }, // Manejo de rutas no encontradas, redirecciona a /login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
