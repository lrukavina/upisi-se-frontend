import { TestBed } from '@angular/core/testing';

import { OdabirKolegijaService } from './odabir-kolegija.service';

describe('OdabirKolegijaService', () => {
  let service: OdabirKolegijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OdabirKolegijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
