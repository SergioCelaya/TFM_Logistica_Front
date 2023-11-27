import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaPedidoComponent } from './mapa-pedido.component';

describe('MapaPedidoComponent', () => {
  let component: MapaPedidoComponent;
  let fixture: ComponentFixture<MapaPedidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapaPedidoComponent]
    });
    fixture = TestBed.createComponent(MapaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
