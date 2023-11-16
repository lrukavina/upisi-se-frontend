import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregledStudenataComponent } from './pregled-studenata.component';

describe('PregledStudenataComponent', () => {
  let component: PregledStudenataComponent;
  let fixture: ComponentFixture<PregledStudenataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PregledStudenataComponent]
    });
    fixture = TestBed.createComponent(PregledStudenataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
