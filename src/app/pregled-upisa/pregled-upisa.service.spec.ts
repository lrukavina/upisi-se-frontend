import { TestBed } from '@angular/core/testing';

import { PregledUpisaService } from './pregled-upisa.service';

describe('PregledUpisaService', () => {
  let service: PregledUpisaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregledUpisaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
