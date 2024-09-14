import { Component, OnInit } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol'; // Import PictureMarkerSymbol
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  private latitude: number | any;
  private longitude: number | any;

  public async ngOnInit() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;

    const map = new Map({
      basemap: "topo-vector"
    });

    const view = new MapView({
      container: "container",
      map: map,
      zoom: 20,
      center: [this.longitude, this.latitude]
    });

    // Menggunakan PictureMarkerSymbol untuk marker custom
    const customMarkerSymbol = new PictureMarkerSymbol({
      url: "https://cdn-icons-png.flaticon.com/512/684/684908.png",  // URL gambar
      width: "32px",  // Lebar gambar marker
      height: "32px"  // Tinggi gambar marker
    });

    // Membuat objek Point untuk lokasi sekarang
    const point = new Point({
      longitude: this.longitude,
      latitude: this.latitude
    });

    // Membuat Graphic untuk marker dengan simbol gambar
    const pointGraphic = new Graphic({
      geometry: point,
      symbol: customMarkerSymbol  // Terapkan simbol gambar
    });

    // Tambahkan marker ke view
    view.graphics.add(pointGraphic);
  }

}
