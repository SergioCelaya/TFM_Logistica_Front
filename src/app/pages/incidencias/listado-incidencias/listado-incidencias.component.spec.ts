import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoIncidenciasComponent } from './listado-incidencias.component';

describe('ListadoIncidenciasComponent', () => {
  let component: ListadoIncidenciasComponent;
  let fixture: ComponentFixture<ListadoIncidenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoIncidenciasComponent]
    });
    fixture = TestBed.createComponent(ListadoIncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
