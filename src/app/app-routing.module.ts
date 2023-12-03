import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { IncidenciasComponent } from './pages/incidencias/incidencias.component';
import { AlmacenesComponent } from './pages/almacenes/almacenes.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { FormAlmacenComponent } from './components/forms/form-almacen/form-almacen.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { FormPedidoComponent } from './components/forms/form-pedido/form-pedido.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirecciona a /login por defecto
  { path: 'login', component: LoginComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'incidencias', component: IncidenciasComponent },
  { path: 'almacenes', component: AlmacenesComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'nuevoAlmacen', component: FormAlmacenComponent },
  { path: 'gestionPedido', component: FormPedidoComponent },
  { path: 'updateAlmacen/:idalmacen', component: FormAlmacenComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirecciona a /login por defecto
  { path: '**', redirectTo: '/login' }, // Manejo de rutas no encontradas, redirecciona a /login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
