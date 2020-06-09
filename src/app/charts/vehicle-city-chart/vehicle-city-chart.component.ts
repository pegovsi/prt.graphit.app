import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {VehiclesCountByCityDto} from "../../models/VehiclesCountByCityDto";
import {HttpServiceService} from "../../services/http-service.service";

@Component({
  selector: 'app-vehicle-city-chart',
  templateUrl: './vehicle-city-chart.component.html',
  styleUrls: ['./vehicle-city-chart.component.scss']
})
export class VehicleCityChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'по городам' }
  ];
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

        this.barChartData = [{data: data.count, label: 'по городам'}];
        this.barChartLabels = data.cities
      });
  }

}
