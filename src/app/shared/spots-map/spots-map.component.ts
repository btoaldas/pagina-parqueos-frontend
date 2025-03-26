import { SpaceResponse } from '@/app/models/space.model';
import { SpaceService } from '@/app/services/space.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as L from 'leaflet';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-spots-map',
  templateUrl: './spots-map.component.html',
  styles: [
    `
      :host {
        display: block;
        height: 1100px;
      }
      .map-container {
        width: 90%;
        height: 1024px;
        margin: 0 auto;
          border: 1px solid #0b3f76; /* Borde azul */
  border-radius: 8px; /* Bordes redondeados */
      }
  
    `,
  ],
})
export class SpotsMapComponent implements OnInit, AfterViewInit {
  private map: L.Map | null = null;
  private spaces: SpaceResponse[] = [];
  private markers: L.Marker[] = [];

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
    this.markers.forEach((marker) => marker.remove());
    this.markers = [];

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

    const latLngs: L.LatLngExpression[] = [];

    this.spaces.forEach((space, index, array) => {
      const marker = L.marker([space.latitude, space.longitude], {
        icon: space.state === 'disponible' ? markerGreenIcon : markerRedIcon,
        keyboard: false,
      })
      .bindPopup(
        `<div style="font-family: Arial, sans-serif; font-size: 14px; text-align: center;">
           <strong>${space.zone.id}Z-${space.id}S</strong><br>
           Estado: ${space.state}<br>
           <a href="https://www.google.com/maps?q=${space.latitude},${space.longitude}" target="_blank" 
              style="
                display: inline-block;
                margin-top: 8px;
                padding: 8px 16px;
                background-color: #007bff;
                color: #ffffff;
                text-decoration: none;
                border-radius: 4px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                font-weight: bold;">
              Ir allí
           </a>
         </div>`
      )
      
      .addTo(this.map!);

      if (this.isTouchDevice()) {
        // En móviles: al hacer clic, se abre el popup
        marker.on('click', function () {
          marker.openPopup();
        });
      } else {
        // En escritorio: al hacer clic, se centra el mapa

    
      // Evento para mostrar el popup al pasar el mouse
      marker.on('mouseover', function () {
        marker.openPopup();
      });
    
      // Evento para abrir Google Maps al hacer clic en el marker
     marker.on('click', () => this.openGoogleMaps(space));
      }

      this.markers.push(marker);
      latLngs.push([space.latitude, space.longitude]);
    
      if (index === array.length - 1) {
        marker.openPopup();
        marker.getElement()?.focus();
      }
    });
    

    if (latLngs.length > 0) {
      const bounds = L.latLngBounds(latLngs);

      this.map!.fitBounds(bounds);
      //this.map!.setZoom(10);
      // Establece el zoom al máximo permitido por la configuración de la capa de tiles
      this.map!.setZoom(this.map!.getMaxZoom());
    }
  }

  openGoogleMaps(spot: SpaceResponse) {
    const url = `https://www.google.com/maps?q=${spot.latitude},${spot.longitude}`;
    window.open(url, '_blank');
  }

  private isTouchDevice(): boolean {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  }
  
  public loadMap(): void {
    this.spaceService.getAll().subscribe({
      next: (response) => {
        if (!response.data) return;
        this.spaces = response.data;
        this.initMap();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit() {
    //this.map = L.map('map').setView([20, 0], 2);
    this.map = L.map('map').setView([-1.487382, -77.998053], 15);

// Capa híbrida de Google: satellite + calles
const googleHybridLayer = L.tileLayer(
  'http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: 'Google Hybrid'
  }
).addTo(this.map); // Se agrega por defecto


     // Capa satelital de Google
     const googleSatLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: 'Google Satellite'
    });

  // Capa base: OpenStreetMap
  const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });



   // Agrega un control de capas para poder alternar entre ellas
   L.control.layers({
    'Google Hibrido': googleHybridLayer,
    'Google Satellite': googleSatLayer,
    'OpenStreetMap': osmLayer    
  }).addTo(this.map);

    this.loadMap();
  }

 // Implementa el hook AfterViewInit
 ngAfterViewInit() {
  // Espera 300ms y luego recalcula el tamaño
  setTimeout(() => {
    this.map?.invalidateSize();
  }, 300);
}
   // Redimensiona el mapa al cambiar el tamaño de la ventana
   @HostListener('window:resize')
   onResize() {
     this.map?.invalidateSize();
   }

}
