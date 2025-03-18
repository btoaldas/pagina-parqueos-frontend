import { SpaceResponse } from '@/app/models/space.model';
import { SpaceService } from '@/app/services/space.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as L from 'leaflet';

@Component({
  selector: 'app-spots-map',
  templateUrl: './spots-map.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 400px;
      }
    `,
  ],
})
export class SpotsMapComponent implements OnInit {
  private map: L.Map | null = null;
  private spaces: SpaceResponse[] = [];

  private iconLocationRed: string;
  private iconLocationGreen: string;

  constructor(
    private spaceService: SpaceService,
    private sanitizer: DomSanitizer
  ) {
    this.iconLocationRed = 'assets/icon/location.red.svg';
    this.iconLocationGreen = 'assets/icon/location.green.svg';
  }

  private initMap(): void {
    this.map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    const markerGreenIcon = L.icon({
      iconUrl: this.iconLocationGreen,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
    const markerRedIcon = L.icon({
      iconUrl: this.iconLocationRed,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    this.spaces.forEach((space) => {
      const marker = L.marker([space.latitude, space.longitude], {
        icon: space.state === 'disponible' ? markerGreenIcon : markerRedIcon,
      })
        .addTo(this.map!)
        .bindPopup(`<b>${space.id}</b><br>Status: ${space.state}`)
        .on('click', () => this.openGoogleMaps(space));
    });
  }

  openGoogleMaps(spot: SpaceResponse) {
    const url = `https://www.google.com/maps?q=${spot.latitude},${spot.longitude}`;
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.spaceService.getAll().subscribe({
      next: (response) => {
        if (!response.data) return;
        this.spaces = response.data;
        console.log(this.spaces);
        this.initMap();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
