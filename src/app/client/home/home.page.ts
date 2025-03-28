import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonIcon,
  IonImg,
  IonButton,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  people,
  cashOutline,
  carOutline,
  warning,
  mapOutline,
  personAddOutline,
  settingsOutline,
  documentTextOutline,
  timeOutline,
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { MainReportType } from '@/app/models/report.model';
import { ReportService } from '@/app/services/report.service';
import { AuthService } from '@/app/services/auth.service';
import { ProfileService } from '@/app/services/profile.service';
import { TicketProfile } from '@/app/models/ticket.model';
import { FineProfile, FineResponse } from '@/app/models/fine.model';
import { environment } from '@/environments/environment.prod';
import { SpotsMapComponent } from '../../shared/spots-map/spots-map.component';

@Component({
  selector: 'page-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
    IonImg,
    IonIcon,
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    SpotsMapComponent,
    IonButton,
    IonItem,
    IonLabel,
  ],
})
export class HomePage implements OnInit {
  report: MainReportType | null = null;
  role: string;
  tickets: TicketProfile[] = [];
  fines: FineProfile[] = [];
  // Variables para controlar la visibilidad de cada bloque
  isStatsMinimized = false;
  isTicketsMinimized = false;
  isMapMinimized = false;
  

  @ViewChild(SpotsMapComponent) spotsMapComponent!: SpotsMapComponent;

  constructor(
    private router: Router,
    private reportService: ReportService,
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    this.role = this.authService.getRole() ?? 'cliente';
    addIcons({
      people,
      cashOutline,
      carOutline,
      warning,
      timeOutline,
      mapOutline,
      personAddOutline,
      settingsOutline,
      documentTextOutline,
    });
  }

  ionViewWillEnter() {
    if (!this.spotsMapComponent) return;
    this.spotsMapComponent.loadMap();
  }

  bakeImage(filename: string | null) {
    if (!filename) return '';
    return environment.apiUrl + '/storage/fine/' + filename;
  }

  getDate(): string {
    const fecha = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return fecha.toLocaleDateString('es-ES', options);
  }

  format(value?: number | null, prefix = '', sufix = '') {
    if (this.report == null || value == null) return 'Cargando...';
    if (isNaN(value)) value = 0;
    return `${prefix}${Intl.NumberFormat().format(Math.round(value * 100) / 100)}${sufix}`;
  }

  isOnTime(fechaObjetivo: Date) {
    const ahora = new Date();
    const objetivo = new Date(fechaObjetivo);
    const diferencia = objetivo.getTime() - ahora.getTime();
    return diferencia <= 0;
  }

  calcularTiempoRestante(fechaObjetivo: Date) {
    const ahora = new Date();
    const objetivo = new Date(fechaObjetivo);
    const diferencia = objetivo.getTime() - ahora.getTime();
    if (diferencia <= 0) {
      return 'Fuera de tiempo';
    }
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    return `Faltan ${horas} horas y ${minutos} minutos.`;
  }

  ngOnInit() {
    this.profileService.tickets().subscribe({
      next: (response) => {
        if (!response.data) return;
        this.tickets = response.data;
      },
    });
    this.profileService.fines().subscribe({
      next: (response) => {
        if (!response.data) return;
        this.fines = response.data;
      },
    });

    if (this.role === 'cliente') return;
    this.reportService.getMainReport().subscribe({
      next: (response) => {
        if (response.data == null) return;
        this.report = response.data;
      },
    });
  }

  toggleStats() {
    this.isStatsMinimized = !this.isStatsMinimized;
  }

  toggleTickets() {
    this.isTicketsMinimized = !this.isTicketsMinimized;
  }

  toggleMap() {
    this.isMapMinimized = !this.isMapMinimized;
  }

  // trackBy para iterar listas de forma óptima
  trackById(index: number, item: any): any {
    return item.id;
  }


}
