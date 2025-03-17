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
  trendingUpOutline,
  peopleOutline,
  businessOutline,
  shield,
  peopleCircle,
  people,
  business,
} from 'ionicons/icons';
import { StatsReportType } from '@/app/models/report.model';
import { ReportService } from '@/app/services/report.service';
import { DownloadReportsComponent } from '../../shared/download-reports/download-reports.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
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
    DownloadReportsComponent,
  ],
})
export class ReportsPage implements OnInit {
  report: StatsReportType | null = null;
  maxIncome: number = 1;
  totalIncome: number = 1;
  totalZone: number = 0;
  averageZone: number = 0;
  users: { admin: number; empleado: number; cliente: number } = {
    admin: 0,
    cliente: 0,
    empleado: 0,
  };

  constructor(private reportService: ReportService) {
    addIcons({
      trendingUpOutline,
      people,
      business,
      shield,
      peopleCircle,
      peopleOutline,
    });
  }

  formatPercent(value: number): string {
    return Intl.NumberFormat().format(Math.round(value * 100)) + '%';
  }

  ngOnInit() {
    this.reportService.getStatsReport().subscribe({
      next: (response) => {
        if (!response.data) return;
        this.report = response.data;

        this.maxIncome = Math.max(
          ...this.report.income_month.map((i) => i.total)
        );
        this.totalIncome = [
          0,
          ...this.report.income_month.map((i) => i.total),
        ].reduce((p, a) => p + a);

        const takenSpace = this.report.each_space_taken
          .map((z) => z.taken)
          .reduce((a, b) => a + b);
        const totalSpace = this.report.each_space_taken
          .map((z) => z.total)
          .reduce((a, b) => a + b);
        this.totalZone = takenSpace / totalSpace;
        this.averageZone =
          this.report.each_space_taken
            .map((z) => z.taken / z.total)
            .reduce((a, b) => a + b) / this.report.each_space_taken.length;

        this.users = {
          admin: this.report.users_rol.admin,
          cliente: this.report.users_rol.client,
          empleado: this.report.users_rol.employ,
        };
      },
    });
  }
}
