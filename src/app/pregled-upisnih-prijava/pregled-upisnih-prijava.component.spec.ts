import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledUpisnihPrijavaComponent } from './pregled-upisnih-prijava.component';

describe('PregledUpisnihPrijavaComponent', () => {
  let component: PregledUpisnihPrijavaComponent;
  let fixture: ComponentFixture<PregledUpisnihPrijavaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregledUpisnihPrijavaComponent]
    });
    fixture = TestBed.createComponent(PregledUpisnihPrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
