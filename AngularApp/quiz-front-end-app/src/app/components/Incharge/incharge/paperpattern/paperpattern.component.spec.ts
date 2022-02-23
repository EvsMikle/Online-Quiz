import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperpatternComponent } from './paperpattern.component';

describe('PaperpatternComponent', () => {
  let component: PaperpatternComponent;
  let fixture: ComponentFixture<PaperpatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaperpatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperpatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
