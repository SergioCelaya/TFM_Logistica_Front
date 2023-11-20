import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestIncidenciasComponent } from './gest-incidencias.component';

describe('GestIncidenciasComponent', () => {
  let component: GestIncidenciasComponent;
  let fixture: ComponentFixture<GestIncidenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestIncidenciasComponent]
    });
    fixture = TestBed.createComponent(GestIncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
