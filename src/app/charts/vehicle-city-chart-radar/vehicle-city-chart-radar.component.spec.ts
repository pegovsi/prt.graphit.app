import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCityChartRadarComponent } from './vehicle-city-chart-radar.component';

describe('VehicleCityChartRadarComponent', () => {
  let component: VehicleCityChartRadarComponent;
  let fixture: ComponentFixture<VehicleCityChartRadarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleCityChartRadarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCityChartRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
