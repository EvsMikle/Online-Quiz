import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquestionsComponent } from './addquestions.component';

describe('AddquestionsComponent', () => {
  let component: AddquestionsComponent;
  let fixture: ComponentFixture<AddquestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddquestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddquestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
