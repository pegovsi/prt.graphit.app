import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseDocumentMovementsComponent } from './warehouse-document-movements.component';

describe('WarehouseDocumentMovementsComponent', () => {
  let component: WarehouseDocumentMovementsComponent;
  let fixture: ComponentFixture<WarehouseDocumentMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseDocumentMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseDocumentMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
