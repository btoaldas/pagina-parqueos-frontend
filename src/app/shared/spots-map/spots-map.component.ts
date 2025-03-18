import { SpaceResponse } from '@/app/models/space.model';
import { SpaceService } from '@/app/services/space.service';
import { Component, OnInit } from '@angular/core';
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

  constructor(private spaceService: SpaceService) {}

  // Configuración e inicialización del mapa
  private initMap(): void {
    this.map = L.map('map').setView([20, 0], 2); // Configura el centro del mapa y el zoom inicial

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // Renderizar spots en el mapa

    this.spaces.forEach((space) => {
      const marker = L.marker([space.latitude, space.longitude])
        .addTo(this.map!)
        .bindPopup(`<b>${space.id}</b><br>Status: ${space.state}`) // Mostrar popup con información
        .on('click', () => this.openGoogleMaps(space)); // Abrir Google Maps al hacer clic
    });

    /* this.spots.forEach(spot => {
      const marker = L.marker([spot.latitude, spot.longitude])
        .addTo(this.map)
        .bindPopup(`<b>${spot.name}</b><br>Status: ${spot.status}`) // Mostrar popup con información
        .on('click', () => this.openGoogleMaps(spot)); // Abrir Google Maps al hacer clic
    }); */
  }

  // Abrir Google Maps al hacer clic en un spot
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
