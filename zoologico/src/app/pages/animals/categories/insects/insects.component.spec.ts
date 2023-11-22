import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsectsComponent } from './insects.component';

describe('InsectsComponent', () => {
  let component: InsectsComponent;
  let fixture: ComponentFixture<InsectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsectsComponent]
    });
    fixture = TestBed.createComponent(InsectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
