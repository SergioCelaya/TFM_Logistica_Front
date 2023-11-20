import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenComponent } from './almacen.component';

describe('AlmacenComponent', () => {
  let component: AlmacenComponent;
  let fixture: ComponentFixture<AlmacenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlmacenComponent]
    });
    fixture = TestBed.createComponent(AlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
