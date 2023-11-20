import { TestBed } from '@angular/core/testing';

import { AlmacenesService } from './almacenes.service';

describe('AlmacenesService', () => {
  let service: AlmacenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlmacenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
