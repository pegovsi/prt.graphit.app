import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdmHomeComponent } from './mdm-home.component';

describe('MdmHomeComponent', () => {
  let component: MdmHomeComponent;
  let fixture: ComponentFixture<MdmHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdmHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdmHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
