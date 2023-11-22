import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReptilesComponent } from './reptiles.component';

describe('ReptilesComponent', () => {
  let component: ReptilesComponent;
  let fixture: ComponentFixture<ReptilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReptilesComponent]
    });
    fixture = TestBed.createComponent(ReptilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
