import { Component, OnInit } from '@angular/core';
import {ChartDataSets, ChartType, RadialChartOptions} from "chart.js";
import {Label} from "ng2-charts";
import {VehiclesCountByCityDto} from "../../models/VehiclesCountByCityDto";
import {HttpServiceService} from "../../services/http-service.service";

@Component({
  selector: 'app-vehicle-city-chart-radar',
  templateUrl: './vehicle-city-chart-radar.component.html',
  styleUrls: ['./vehicle-city-chart-radar.component.scss']
})
export class VehicleCityChartRadarComponent implements OnInit {
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = [];

  public radarChartData: ChartDataSets[] = [];
  public radarChartType: ChartType = 'radar';
  chartColors: any[] = [
    {
      backgroundColor:["#6FC8CE", "#6FC8CE", "#6FC8CE", "#FFFCC4", "#B9E8E0"]
    }];

  vehiclesCountByCity: VehiclesCountByCityDto;

  constructor(private httpClient: HttpServiceService) { }

  ngOnInit(): void {
    this.httpClient.getVehicleByCityReport()
      .subscribe(data => {
        this.vehiclesCountByCity = data;

        this.radarChartData = [{data: data.count, label: 'по городам'}];
        this.radarChartLabels = data.cities
      });
  }

}
