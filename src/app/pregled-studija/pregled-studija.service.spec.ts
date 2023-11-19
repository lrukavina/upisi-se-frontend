import { TestBed } from '@angular/core/testing';

import { PregledStudijaService } from './pregled-studija.service';

describe('PregledStudijaService', () => {
  let service: PregledStudijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregledStudijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
