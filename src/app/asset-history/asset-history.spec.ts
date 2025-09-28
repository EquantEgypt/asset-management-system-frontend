import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetHistory } from './asset-history';

describe('AssetHistory', () => {
  let component: AssetHistory;
  let fixture: ComponentFixture<AssetHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
