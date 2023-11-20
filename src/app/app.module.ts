import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/general/menu/menu.component';
import { ListadoPedidosComponent } from './pages/general/listado-pedidos/listado-pedidos.component';
import { DetallePedidoComponent } from './pages/general/detalle-pedido/detalle-pedido.component';
import { ListadoIncidenciasComponent } from './pages/incidencias/listado-incidencias/listado-incidencias.component';
import { IncidenciaComponent } from './pages/incidencias/incidencia/incidencia.component';
import { DetalleIncidenciaComponent } from './pages/incidencias/detalle-incidencia/detalle-incidencia.component';
import { GestIncidenciasComponent } from './pages/gest-incidencias/gest-incidencias.component';
import { ListadoEmpleadosComponent } from './pages/empleados/listado-empleados/listado-empleados.component';
import { EmpleadoComponent } from './pages/empleados/empleado/empleado.component';
import { DetalleEmpleadoComponent } from './pages/empleados/detalle-empleado/detalle-empleado.component';
import { GestEmpleadosComponent } from './pages/gest-empleados/gest-empleados.component';
import { ListadoAlmacenesComponent } from './pages/almacenes/listado-almacenes/listado-almacenes.component';
import { AlmacenComponent } from './pages/almacenes/almacen/almacen.component';
import { GestAlmacenComponent } from './pages/gest-almacen/gest-almacen.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    ListadoPedidosComponent,
    DetallePedidoComponent,
    ListadoIncidenciasComponent,
    IncidenciaComponent,
    DetalleIncidenciaComponent,
    GestIncidenciasComponent,
    ListadoEmpleadosComponent,
    EmpleadoComponent,
    DetalleEmpleadoComponent,
    GestEmpleadosComponent,
    ListadoAlmacenesComponent,
    AlmacenComponent,
    GestAlmacenComponent,
    GestAlmacenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
