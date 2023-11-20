import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestAlmacenComponent } from './gest-almacen.component';

describe('GestAlmacenComponent', () => {
  let component: GestAlmacenComponent;
  let fixture: ComponentFixture<GestAlmacenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestAlmacenComponent]
    });
    fixture = TestBed.createComponent(GestAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
