import { TestBed } from '@angular/core/testing';

import { PotvrdaUpisaService } from './potvrda-upisa.service';

describe('PotvrdaUpisaService', () => {
  let service: PotvrdaUpisaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PotvrdaUpisaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
