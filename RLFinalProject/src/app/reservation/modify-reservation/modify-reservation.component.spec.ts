import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyReservationComponent } from './modify-reservation.component';

describe('ModifyReservationComponent', () => {
  let component: ModifyReservationComponent;
  let fixture: ComponentFixture<ModifyReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
