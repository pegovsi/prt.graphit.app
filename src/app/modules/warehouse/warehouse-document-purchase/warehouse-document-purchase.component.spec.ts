import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseDocumentPurchaseComponent } from './warehouse-document-purchase.component';

describe('WarehouseDocumentPurchaseComponent', () => {
  let component: WarehouseDocumentPurchaseComponent;
  let fixture: ComponentFixture<WarehouseDocumentPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseDocumentPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseDocumentPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
