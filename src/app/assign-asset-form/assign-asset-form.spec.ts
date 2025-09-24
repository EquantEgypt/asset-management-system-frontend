import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignAssetForm } from './assign-asset-form';

describe('AssignAssetForm', () => {
  let component: AssignAssetForm;
  let fixture: ComponentFixture<AssignAssetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignAssetForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignAssetForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
