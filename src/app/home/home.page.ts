import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import { Geolocation } from '@capacitor/geolocation';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'; // Use picture marker
import ImageryLayer from '@arcgis/core/layers/ImageryLayer';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  mapView: MapView | any;
  userLocationGraphic: Graphic | any;
  map: Map | any;
  latitude: number = 36.40737347996374;
  longitude: number = -97.90088176361843;

  constructor() {}

  async ngOnInit() {
    this.map = new Map({
      basemap: 'topo-vector' // Default basemap
    });

    this.mapView = new MapView({
      container: 'container',
      map: this.map,
      zoom: 8,
      center: [this.longitude, this.latitude]
    });

    let weatherServiceFL = new ImageryLayer({ url: WeatherServiceUrl });
    this.map.add(weatherServiceFL);

    this.addMarkerAtLocation(this.latitude, this.longitude);
  }

  // Function to add a marker at the specified coordinates
  addMarkerAtLocation(lat: number, long: number) {
    const point = new Point({ latitude: lat, longitude: long });

    // Use PictureMarkerSymbol to display a custom image as the marker
    const symbol = new PictureMarkerSymbol({
      url: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // URL of the image
      width: '32px',  // width of the image
      height: '32px', // height of the image
    });

    this.userLocationGraphic = new Graphic({
      geometry: point,
      symbol: symbol
    });

    this.mapView.graphics.add(this.userLocationGraphic); // Add the marker to the map
  }

  // Function to handle basemap change
  onBasemapChange(event: any) {
    const selectedBasemap = event.detail.value;
    this.map.basemap = selectedBasemap; // Change the basemap
  }
}

const WeatherServiceUrl = 'https://mapservices.weather.noaa.gov/eventdriven/rest/services/radar/radar_base_reflectivity_time/ImageServer';
