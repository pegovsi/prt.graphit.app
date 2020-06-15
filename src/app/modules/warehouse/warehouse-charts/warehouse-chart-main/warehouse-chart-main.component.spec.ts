import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseChartMainComponent } from './warehouse-chart-main.component';

describe('WarehouseChartMainComponent', () => {
  let component: WarehouseChartMainComponent;
  let fixture: ComponentFixture<WarehouseChartMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseChartMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseChartMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
