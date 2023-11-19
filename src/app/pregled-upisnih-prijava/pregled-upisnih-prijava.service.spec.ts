import { TestBed } from '@angular/core/testing';

import { PregledUpisnihPrijavaService } from './pregled-upisnih-prijava.service';

describe('PregledUpisnihPrijavaService', () => {
  let service: PregledUpisnihPrijavaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregledUpisnihPrijavaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
