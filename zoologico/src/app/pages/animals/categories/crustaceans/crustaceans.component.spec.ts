import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrustaceansComponent } from './crustaceans.component';

describe('CrustaceansComponent', () => {
  let component: CrustaceansComponent;
  let fixture: ComponentFixture<CrustaceansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrustaceansComponent]
    });
    fixture = TestBed.createComponent(CrustaceansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
