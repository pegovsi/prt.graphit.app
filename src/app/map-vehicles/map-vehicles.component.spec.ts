import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapVehiclesComponent } from './map-vehicles.component';

describe('MapVehiclesComponent', () => {
  let component: MapVehiclesComponent;
  let fixture: ComponentFixture<MapVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
