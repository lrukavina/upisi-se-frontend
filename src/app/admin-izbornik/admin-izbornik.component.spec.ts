import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIzbornikComponent } from './admin-izbornik.component';

describe('AdminIzbornikComponent', () => {
  let component: AdminIzbornikComponent;
  let fixture: ComponentFixture<AdminIzbornikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminIzbornikComponent]
    });
    fixture = TestBed.createComponent(AdminIzbornikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
