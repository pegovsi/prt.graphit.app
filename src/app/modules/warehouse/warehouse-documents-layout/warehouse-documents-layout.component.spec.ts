import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseDocumentsLayoutComponent } from './warehouse-documents-layout.component';

describe('WarehouseDocumentsLayoutComponent', () => {
  let component: WarehouseDocumentsLayoutComponent;
  let fixture: ComponentFixture<WarehouseDocumentsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseDocumentsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseDocumentsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
