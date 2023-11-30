import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { IncidenciasComponent } from './pages/incidencias/incidencias.component';
import { AlmacenesComponent } from './pages/almacenes/almacenes.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { NuevoAlmacenComponent } from './pages/nuevo-almacen/nuevo-almacen.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'incidencias', component: IncidenciasComponent },
  { path: 'almacenes', component: AlmacenesComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'nuevoAlmacen', component: NuevoAlmacenComponent },
  { path: 'updateAlmacen/:idalmacen', component: NuevoAlmacenComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirecciona a /login por defecto
  { path: '**', redirectTo: '/login' } // Manejo de rutas no encontradas, redirecciona a /login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
