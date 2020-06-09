import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilitaryPositionComponent } from './military-position.component';

describe('MilitaryPositionComponent', () => {
  let component: MilitaryPositionComponent;
  let fixture: ComponentFixture<MilitaryPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilitaryPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilitaryPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
