import { AuthService } from '@/app/services/auth.service';
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
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  downloadPdf() {
    window.open(environment.apiUrl + '/report/pdf', '_blank');
  }

  downloadExcel() {
    if (this.authService.getRole() === 'admin') {
      window.open(environment.apiUrl + '/report/xlsx', '_blank');
    } else {
      const id = this.authService.getId();

      if (id == null) return;

      window.open(environment.apiUrl + `/profile/report/xlsx/${id}`, '_blank');
    }
  }
}
