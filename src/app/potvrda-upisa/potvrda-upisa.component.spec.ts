import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotvrdaUpisaComponent } from './potvrda-upisa.component';

describe('PotvrdaUpisaComponent', () => {
  let component: PotvrdaUpisaComponent;
  let fixture: ComponentFixture<PotvrdaUpisaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PotvrdaUpisaComponent]
    });
    fixture = TestBed.createComponent(PotvrdaUpisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
