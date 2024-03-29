import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {SplitService} from "../services/split.service";

declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private splitService: SplitService) { }

  map: any;
  latitude: number = 50.008; //10.4683841;
  longitude: number = 50.010; //-66.9604058;
  vheightNumber = 350;
  vheight = `${350}px`;


  ngOnInit(): void {

    this.splitService.dynamicComponent$.subscribe(data=>{
      console.log('setCenter');
      this.vheightNumber = this.vheightNumber + 100;
      this.vheight = `${this.vheightNumber}px`;
      //this.setCenter();
    });

    var mousePositionControl = new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:4326',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
    });


    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }).extend([mousePositionControl]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.XYZ({
            url: `${environment.api}/api/v1/map?z={z}&x={x}&y={y}`
          })
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.latitude, this.longitude]),
        zoom: 5
      })
    });

    this.map.on('click', function (args) {
      console.log(args.coordinate);
      var lonlat = ol.proj.transform(args.coordinate, 'EPSG:3857', 'EPSG:4326');
      console.log(lonlat);

      var lon = lonlat[0];
      var lat = lonlat[1];
      alert(`lat: ${lat} long: ${lon}`);
    });

    //lat: 55.53240844505305 long: 38.78578052290355
    //lat: 55.73504754387426 long: 54.991395194071316
    //lat: 52.18968548218041 long: 46.2921807603836
    this.addPoint(55.53240844505305, 38.78578052290355);
    this.addPoint(55.73504754387426, 54.991395194071316);
    this.addPoint(52.18968548218041, 46.2921807603836);
  }

  setCenter() {
    var view = this.map.getView();
    view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
    view.setZoom(5);
  }

  addPoint(lat: number, lng: number) {
    var vectorLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857')),
        })]
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 0.5],
          anchorXUnits: "fraction",
          anchorYUnits: "fraction",
          src: "assets/location icon.png"
        })
      })
    });
    this.map.addLayer(vectorLayer);
  }

}
