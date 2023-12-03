import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIncidenciasComponent } from './form-incidencias.component';

describe('FormIncidenciasComponent', () => {
  let component: FormIncidenciasComponent;
  let fixture: ComponentFixture<FormIncidenciasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormIncidenciasComponent]
    });
    fixture = TestBed.createComponent(FormIncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
