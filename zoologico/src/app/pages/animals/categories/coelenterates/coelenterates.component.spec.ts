import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoelenteratesComponent } from './coelenterates.component';

describe('CoelenteratesComponent', () => {
  let component: CoelenteratesComponent;
  let fixture: ComponentFixture<CoelenteratesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoelenteratesComponent]
    });
    fixture = TestBed.createComponent(CoelenteratesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
