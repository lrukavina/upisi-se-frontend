import { TestBed } from '@angular/core/testing';

import { PregledStudenataService } from './pregled-studenata.service';

describe('PregledStudenataService', () => {
  let service: PregledStudenataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PregledStudenataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
