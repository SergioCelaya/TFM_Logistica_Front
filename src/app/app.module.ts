import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaIncidenciasComponent } from './components/lista-incidencias/lista-incidencias.component';
import { IncidenciasComponent } from './pages/incidencias/incidencias.component';
import { DetalleIncidenciaComponent } from './components/detalle-incidencia/detalle-incidencia.component';
import { DetallePedidoComponent } from './components/detalle-pedido/detalle-pedido.component';
import { ListaPedidosComponent } from './components/lista-pedidos/lista-pedidos.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    ListaIncidenciasComponent,
    IncidenciasComponent,
    DetalleIncidenciaComponent,
    DetallePedidoComponent,
    ListaPedidosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
