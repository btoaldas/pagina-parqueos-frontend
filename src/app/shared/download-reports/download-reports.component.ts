import { environment } from '@/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-download-reports',
  standalone: true,
  templateUrl: './download-reports.component.html',
  imports: [IonButton],
})
export class DownloadReportsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  downloadPdf() {
    window.open(environment.apiUrl + '/report/pdf', '_blank');
  }

  downloadExcel() {
    window.open(environment.apiUrl + '/report/xlsx', '_blank');
  }
}
