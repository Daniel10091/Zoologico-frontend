import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoosComponent } from './zoos.component';

describe('ZoosComponent', () => {
  let component: ZoosComponent;
  let fixture: ComponentFixture<ZoosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoosComponent]
    });
    fixture = TestBed.createComponent(ZoosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
