import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestEmpleadosComponent } from './gest-empleados.component';

describe('GestEmpleadosComponent', () => {
  let component: GestEmpleadosComponent;
  let fixture: ComponentFixture<GestEmpleadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestEmpleadosComponent]
    });
    fixture = TestBed.createComponent(GestEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
