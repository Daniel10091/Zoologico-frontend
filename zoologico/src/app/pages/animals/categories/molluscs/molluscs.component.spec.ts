import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MolluscsComponent } from './molluscs.component';

describe('MolluscsComponent', () => {
  let component: MolluscsComponent;
  let fixture: ComponentFixture<MolluscsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MolluscsComponent]
    });
    fixture = TestBed.createComponent(MolluscsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
