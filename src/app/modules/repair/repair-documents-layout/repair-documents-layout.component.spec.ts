import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairDocumentsLayoutComponent } from './repair-documents-layout.component';

describe('RepairDocumentsLayoutComponent', () => {
  let component: RepairDocumentsLayoutComponent;
  let fixture: ComponentFixture<RepairDocumentsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairDocumentsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairDocumentsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
