import { TestBed } from '@angular/core/testing';

import { PregledVisokihUcilistaService } from './pregled-visokih-ucilista.service';

describe('PregledVisokihUcilistaService', () => {
  let service: PregledVisokihUcilistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregledVisokihUcilistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
