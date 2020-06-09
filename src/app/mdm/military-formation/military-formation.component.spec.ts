import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilitaryFormationComponent } from './military-formation.component';

describe('MilitaryFormationComponent', () => {
  let component: MilitaryFormationComponent;
  let fixture: ComponentFixture<MilitaryFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilitaryFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilitaryFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
