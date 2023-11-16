import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdabirKolegijaComponent } from './odabir-kolegija.component';

describe('OdabirKolegijaComponent', () => {
  let component: OdabirKolegijaComponent;
  let fixture: ComponentFixture<OdabirKolegijaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OdabirKolegijaComponent]
    });
    fixture = TestBed.createComponent(OdabirKolegijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
