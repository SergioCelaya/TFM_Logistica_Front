import { Component, Input, inject } from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Pedido } from 'src/app/models/pedido.interface';
import { MapDirectionsService } from '@angular/google-maps';
import { MapService } from 'src/app/services/map.service';
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
    zoom: 8,
  };

  @Input() pedido: Pedido | null = null;

  ngOnInit() {}

  directionsResults$!: Observable<google.maps.DirectionsResult | undefined>; 

  constructor(
    mapDirectionsService: MapDirectionsService,
    private _mapService: MapService
  ) {
    console.log('inicio de contructor mapa pedido');
    this._mapService.obsCurrentApiStatus.subscribe((status) => {
      this.apiLoaded = status.valueOf();
    });

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
        console.log(almacenDestino);
        console.log(almacenOrigen)
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
