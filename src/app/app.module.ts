import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { ListaIncidenciasComponent } from './components/listas/lista-incidencias/lista-incidencias.component';
import { IncidenciasComponent } from './pages/incidencias/incidencias.component';
import { DetalleIncidenciaComponent } from './components/detalle/detalle-incidencia/detalle-incidencia.component';
import { DetallePedidoComponent } from './components/detalle/detalle-pedido/detalle-pedido.component';
import { ListaPedidosComponent } from './components/listas/lista-pedidos/lista-pedidos.component';
import { DetalleAlmacenComponent } from './components/detalle/detalle-almacen/detalle-almacen.component';
import { ListaAlmacenesComponent } from './components/listas/lista-almacenes/lista-almacenes.component';
import { AlmacenesComponent } from './pages/almacenes/almacenes.component';
import { ListaEmpleadosComponent } from './components/listas/lista-empleados/lista-empleados.component';
import { DetalleEmpleadoComponent } from './components/detalle/detalle-empleado/detalle-empleado.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { MapaPedidoComponent } from './components/mapa-pedido/mapa-pedido.component';
import { FormAlmacenComponent } from './components/forms/form-almacen/form-almacen.component';
import { PedidosComponent } from './pages/pedidos/pedidos.component';
import { PedidoComponent } from './components/pedido/pedido.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormPedidoComponent } from './components/forms/form-pedido/form-pedido.component';
import { FormIncidenciasComponent } from './components/forms/form-incidencias/form-incidencias.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    ListaIncidenciasComponent,
    IncidenciasComponent,
    DetalleIncidenciaComponent,
    DetallePedidoComponent,
    ListaPedidosComponent,
    DetalleAlmacenComponent,
    ListaAlmacenesComponent,
    AlmacenesComponent,
    ListaEmpleadosComponent,
    DetalleEmpleadoComponent,
    EmpleadosComponent,
    MapaPedidoComponent,
    FormAlmacenComponent,
    PedidosComponent,
    PedidoComponent,
    FormPedidoComponent,
    FormIncidenciasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    GoogleMapsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
