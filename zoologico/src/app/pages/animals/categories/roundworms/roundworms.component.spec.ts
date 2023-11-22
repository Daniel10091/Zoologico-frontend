import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundwormsComponent } from './roundworms.component';

describe('RoundwormsComponent', () => {
  let component: RoundwormsComponent;
  let fixture: ComponentFixture<RoundwormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoundwormsComponent]
    });
    fixture = TestBed.createComponent(RoundwormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
