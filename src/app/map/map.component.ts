import { Component, AfterViewInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { boundingExtent } from 'ol/extent';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Fill, Stroke, Style } from 'ol/style';

const irelandExtent = boundingExtent([
  fromLonLat([-16.185484, 55.663523]), // NW
  fromLonLat([-1.112498, 51.362990])   // SE
]);

const polygonLayer = new VectorLayer({
  source: new VectorSource({
    url: 'assets/map.geojson',
    format: new GeoJSON()
  }),
  style: new Style({
    stroke: new Stroke({
      color: 'red',
      width: 3
    }),
    fill: new Fill({
      color: 'rgba(255, 0, 0, 0.2)'
    })
  })
});

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.html',
  styleUrls: ['./map.scss']
})
export class MapComponent implements AfterViewInit {
  map!: Map;

  ngAfterViewInit(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        polygonLayer   // ✅ Add the polygon layer here
      ],
      view: new View({
        center: fromLonLat([-7.6854556, 53.4217687]),
        zoom: 7.5,
        minZoom: 7.5,
        maxZoom: 20,
        constrainResolution: false,
        extent: irelandExtent
      })
    });
  }
}
