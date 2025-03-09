import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@/environments/environment.prod';

import { MainReportType, StatsReportType } from '../models/report.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = `${environment.apiUrl}/report`;

  constructor(private http: HttpClient) {}

  getMainReport(): Observable<ApiResponse<MainReportType>> {
    return this.http.get<ApiResponse<MainReportType>>(this.apiUrl + '/main');
  }

  getStatsReport(): Observable<ApiResponse<StatsReportType>> {
    return this.http.get<ApiResponse<StatsReportType>>(this.apiUrl + '/stats');
  }
}
