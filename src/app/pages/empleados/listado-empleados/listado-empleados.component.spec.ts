import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEmpleadosComponent } from './listado-empleados.component';

describe('ListadoEmpleadosComponent', () => {
  let component: ListadoEmpleadosComponent;
  let fixture: ComponentFixture<ListadoEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoEmpleadosComponent]
    });
    fixture = TestBed.createComponent(ListadoEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
