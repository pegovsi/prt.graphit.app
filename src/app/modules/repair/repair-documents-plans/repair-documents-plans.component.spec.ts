import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairDocumentsPlansComponent } from './repair-documents-plans.component';

describe('RepairDocumentsPlansComponent', () => {
  let component: RepairDocumentsPlansComponent;
  let fixture: ComponentFixture<RepairDocumentsPlansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairDocumentsPlansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairDocumentsPlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
