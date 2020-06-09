import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCityChartComponent } from './vehicle-city-chart.component';

describe('VehicleCityChartComponent', () => {
  let component: VehicleCityChartComponent;
  let fixture: ComponentFixture<VehicleCityChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCityChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
