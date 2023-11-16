import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledStudijaComponent } from './pregled-studija.component';

describe('PregledStudijaComponent', () => {
  let component: PregledStudijaComponent;
  let fixture: ComponentFixture<PregledStudijaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregledStudijaComponent]
    });
    fixture = TestBed.createComponent(PregledStudijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
