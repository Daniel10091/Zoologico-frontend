import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArachnidsComponent } from './arachnids.component';

describe('ArachnidsComponent', () => {
  let component: ArachnidsComponent;
  let fixture: ComponentFixture<ArachnidsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArachnidsComponent]
    });
    fixture = TestBed.createComponent(ArachnidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
