import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArthropodsComponent } from './arthropods.component';

describe('ArthropodsComponent', () => {
  let component: ArthropodsComponent;
  let fixture: ComponentFixture<ArthropodsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArthropodsComponent]
    });
    fixture = TestBed.createComponent(ArthropodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
