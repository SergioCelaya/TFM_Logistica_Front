import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { IncidenciasComponent } from './pages/incidencias/incidencias.component';
import { AlmacenesComponent } from './pages/almacenes/almacenes.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { NuevoAlmacenComponent } from './pages/nuevo-almacen/nuevo-almacen.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirecciona a /login por defecto
  { path: 'login', component: LoginComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'incidencias', component: IncidenciasComponent },
  { path: 'almacenes', component: AlmacenesComponent },
  { path: 'nuevoAlmacen', component: NuevoAlmacenComponent },
  { path: 'updateAlmacen/:idalmacen', component: NuevoAlmacenComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: '**', redirectTo: '/login' } // Manejo de rutas no encontradas, redirecciona a /login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
