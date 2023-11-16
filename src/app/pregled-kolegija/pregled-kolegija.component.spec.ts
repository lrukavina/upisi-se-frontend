import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledKolegijaComponent } from './pregled-kolegija.component';

describe('PregledKolegijaComponent', () => {
  let component: PregledKolegijaComponent;
  let fixture: ComponentFixture<PregledKolegijaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregledKolegijaComponent]
    });
    fixture = TestBed.createComponent(PregledKolegijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
