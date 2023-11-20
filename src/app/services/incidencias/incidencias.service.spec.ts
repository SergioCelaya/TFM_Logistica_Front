import { TestBed } from '@angular/core/testing';

import { IncidenciasService } from './incidencias.service';

describe('IncidenciasService', () => {
  let service: IncidenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
