import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmphibiansComponent } from './amphibians.component';

describe('AmphibiansComponent', () => {
  let component: AmphibiansComponent;
  let fixture: ComponentFixture<AmphibiansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmphibiansComponent]
    });
    fixture = TestBed.createComponent(AmphibiansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
