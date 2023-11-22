import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatwormsComponent } from './flatworms.component';

describe('FlatwormsComponent', () => {
  let component: FlatwormsComponent;
  let fixture: ComponentFixture<FlatwormsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlatwormsComponent]
    });
    fixture = TestBed.createComponent(FlatwormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
