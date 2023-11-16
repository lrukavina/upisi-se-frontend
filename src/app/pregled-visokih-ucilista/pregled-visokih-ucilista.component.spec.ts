import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledVisokihUcilistaComponent } from './pregled-visokih-ucilista.component';

describe('PregledVisokihUcilistaComponent', () => {
  let component: PregledVisokihUcilistaComponent;
  let fixture: ComponentFixture<PregledVisokihUcilistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregledVisokihUcilistaComponent]
    });
    fixture = TestBed.createComponent(PregledVisokihUcilistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
