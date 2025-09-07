import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItDashboard } from './it-dashboard';

describe('ItDashboard', () => {
  let component: ItDashboard;
  let fixture: ComponentFixture<ItDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
