import { Component, OnInit } from '@angular/core';
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
  ],
})
export class HomePage implements OnInit {
  report: MainReportType | null = null;
  role: string;
  tickets: TicketProfile[] = [];
  fines: FineProfile[] = [];

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

  bakeImage(fine?: FineProfile | null) {
    if (!fine) return '';
    const path =
      environment.apiUrl + '/storage/fine/' + fine.id_ticket + '_' + fine.id;

    if (fine.mime.includes('png')) return path + '.png';
    else return path + '.jpg';
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
    if (this.report == null || value == null) return 'Loading...';
    if (isNaN(value)) value = 0;
    return `${prefix}${Intl.NumberFormat().format(
      Math.round(value * 100) / 100
    )}${sufix}`;
  }

  fastAccesst() {
    return [
      {
        text: 'Nuevo Usuario',
        classname:
          'text-blue-600 bg-blue-200 dark:bg-blue-900 dark:text-blue-300',
        icon: 'person-add-outline',
        action: () => this.router.navigate(['/users/new']),
      },
      {
        text: 'Gestionar Zonas',
        classname:
          'text-green-600 bg-green-200 dark:bg-green-900 dark:text-green-300',
        icon: 'map-outline',
        action: () => this.router.navigate(['/parking']),
      },
      {
        text: 'Configuración',
        classname:
          'text-yellow-600 bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300',
        icon: 'settings-outline',
        action: () => {},
      },
      {
        text: 'Reportes',
        classname:
          'text-rose-600 bg-rose-200 dark:bg-rose-900 dark:text-rose-300',
        icon: 'document-text-outline',
        action: () => this.router.navigate(['/reports']),
      },
    ];
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

    const horas = Math.floor(diferencia / (1000 * 60 * 60)); // Horas restantes
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60)); // Minutos restantes

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
}
