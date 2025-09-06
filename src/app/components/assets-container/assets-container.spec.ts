import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsContainer } from './assets-container';

describe('AssetsContainer', () => {
  let component: AssetsContainer;
  let fixture: ComponentFixture<AssetsContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
