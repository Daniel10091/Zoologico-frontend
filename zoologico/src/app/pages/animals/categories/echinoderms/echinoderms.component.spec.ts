import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchinodermsComponent } from './echinoderms.component';

describe('EchinodermsComponent', () => {
  let component: EchinodermsComponent;
  let fixture: ComponentFixture<EchinodermsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EchinodermsComponent]
    });
    fixture = TestBed.createComponent(EchinodermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
