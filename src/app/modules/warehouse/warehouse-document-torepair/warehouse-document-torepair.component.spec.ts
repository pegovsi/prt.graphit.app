import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseDocumentTorepairComponent } from './warehouse-document-torepair.component';

describe('WarehouseDocumentTorepairComponent', () => {
  let component: WarehouseDocumentTorepairComponent;
  let fixture: ComponentFixture<WarehouseDocumentTorepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseDocumentTorepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseDocumentTorepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
