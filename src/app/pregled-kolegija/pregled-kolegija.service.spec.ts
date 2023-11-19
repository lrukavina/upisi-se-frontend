import { TestBed } from '@angular/core/testing';

import { PregledKolegijaService } from './pregled-kolegija.service';

describe('PregledKolegijaService', () => {
  let service: PregledKolegijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregledKolegijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
