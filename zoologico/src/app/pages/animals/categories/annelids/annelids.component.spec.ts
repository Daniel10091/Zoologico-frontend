import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnelidsComponent } from './annelids.component';

describe('AnnelidsComponent', () => {
  let component: AnnelidsComponent;
  let fixture: ComponentFixture<AnnelidsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnelidsComponent]
    });
    fixture = TestBed.createComponent(AnnelidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
