import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAlmacenesComponent } from './listado-almacenes.component';

describe('ListadoAlmacenesComponent', () => {
  let component: ListadoAlmacenesComponent;
  let fixture: ComponentFixture<ListadoAlmacenesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListadoAlmacenesComponent]
    });
    fixture = TestBed.createComponent(ListadoAlmacenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
