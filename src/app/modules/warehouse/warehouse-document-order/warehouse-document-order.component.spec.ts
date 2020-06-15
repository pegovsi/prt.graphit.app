import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseDocumentOrderComponent } from './warehouse-document-order.component';

describe('WarehouseDocumentOrderComponent', () => {
  let component: WarehouseDocumentOrderComponent;
  let fixture: ComponentFixture<WarehouseDocumentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseDocumentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseDocumentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
