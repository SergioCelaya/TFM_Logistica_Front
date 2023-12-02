import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private currentApiStatus: BehaviorSubject<Boolean>;
  obsCurrentApiStatus: Observable<Boolean>;

  constructor(httpClient: HttpClient) {
    console.log("inicio de contructor servicio mapa")
    this.currentApiStatus =  new BehaviorSubject(new Boolean(false));
    this.obsCurrentApiStatus = this.currentApiStatus.asObservable();
    httpClient.jsonp('https://maps.googleapis.com/maps/api/js', 'callback')
    
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    ).subscribe( loaded => {
      this.currentApiStatus.next(loaded);
    });
    console.log("fin de contructor mapa pedido")
  }
}
