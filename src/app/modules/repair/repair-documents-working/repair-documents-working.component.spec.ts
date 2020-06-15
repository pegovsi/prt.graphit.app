import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairDocumentsWorkingComponent } from './repair-documents-working.component';

describe('RepairDocumentsWorkingComponent', () => {
  let component: RepairDocumentsWorkingComponent;
  let fixture: ComponentFixture<RepairDocumentsWorkingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairDocumentsWorkingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairDocumentsWorkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
