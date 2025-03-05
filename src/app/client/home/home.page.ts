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
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { MainReportType } from '@/app/models/report.model';
import { ReportService } from '@/app/services/report.service';

@Component({
  selector: 'page-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
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

  constructor(private router: Router, private reportService: ReportService) {
    addIcons({
      people,
      cashOutline,
      carOutline,
      warning,
      mapOutline,
      personAddOutline,
      settingsOutline,
      documentTextOutline,
    });
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

  ngOnInit() {
    this.reportService.getMainReport().subscribe({
      next: (response) => {
        if (response.data == null) return;
        this.report = response.data;
      },
    });
  }
}
