import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentationButtonComponent } from './presentation-button.component';

describe('PresentationButtonComponent', () => {
  let component: PresentationButtonComponent;
  let fixture: ComponentFixture<PresentationButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentationButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
