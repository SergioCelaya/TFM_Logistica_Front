import { Component, Input, inject } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Pedido } from 'src/app/models/pedido.interface';
import { GoogleMap, MapDirectionsService } from '@angular/google-maps';
import { PedidosService } from 'src/app/services/pedidos.service';
import { AlmacenService } from 'src/app/services/almacen.service';

@Component({
  selector: 'app-mapa-pedido',
  templateUrl: './mapa-pedido.component.html',
  styleUrls: ['./mapa-pedido.component.css'],
})
export class MapaPedidoComponent {
  apiLoaded!: boolean;
  pedidosService = inject(PedidosService);
  almacenesService = inject(AlmacenService);
  private unsubscribe = new Subject<void>();
  center: google.maps.LatLng = new google.maps.LatLng(40, -2);
  myposition: google.maps.LatLng = new google.maps.LatLng(40, -3);
  options: google.maps.MapOptions = {
    mapTypeId: 'satellite',
    zoom: 8
  };
  markerOptions = {
    icon: {
      url: '../../../assets/warehouse.png',
      scaledSize: new google.maps.Size(30,30)
    }
  }

  @Input() pedido: Pedido | null = null;

  ngOnInit() {}

  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>;

  constructor(
    mapDirectionsService: MapDirectionsService
  ) {

    this.pedidosService
      .getPedidoActivo$()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(async (pedido) => {
        let almacenOrigen = await this.almacenesService.getById(
          pedido.almacen_origen
        );
        let almacenDestino = await this.almacenesService.getById(
          pedido.almacen_destino
        );
        const request: google.maps.DirectionsRequest = {
          destination: {
            lat: Number(almacenDestino.lat),
            lng: Number(almacenDestino.long),
          },
          origin: {
            lat: Number(almacenOrigen.lat),
            lng: Number(almacenOrigen.long),
          },
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          language: 'es'
        };
        this.directionsResults$ = mapDirectionsService
          .route(request)
          .pipe(map((response) => response.result));
      });
  }
}
