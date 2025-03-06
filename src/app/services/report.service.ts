import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, of, throwError, delay } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LoginResponseType } from '../models/auth-response.model';
import { MainReportType, StatsReportType } from '../models/report.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = `${environment.apiUrl}/report`;

  constructor(private http: HttpClient) {}

  getMainReport(): Observable<ApiResponse<MainReportType>> {
    const report: MainReportType = {
      active_users: {
        current_month: 120,
        last_month: 112,
      },
      income_today: {
        total: 412,
      },
      spaces_taken: {
        percent: 0.5,
        taken: 5,
        total: 10,
      },
      fees: {
        amount: 22.5,
        total: 10,
      },
    };

    return of({
      ok: true,
      message: 'Success',
      statusCode: 200,
      data: report,
    }).pipe(delay(2000));
  }

  getStatsReport(): Observable<ApiResponse<StatsReportType>> {
    const report: StatsReportType = {
      income_month: [
        {
          year: 2024,
          month: 12,
          total: 90,
        },
        {
          year: 2025,
          month: 1,
          total: 111,
        },
        {
          year: 2025,
          month: 2,
          total: 161,
        },
        {
          year: 2025,
          month: 3,
          total: 139,
        },
      ],
      each_space_taken: [
        {
          id: 1,
          taken: 12,
          total: 42,
        },
        {
          id: 2,
          taken: 11,
          total: 32,
        },
        {
          id: 3,
          taken: 15,
          total: 110,
        },
      ],
      users_rol: {
        admin: 1,
        client: 2,
        employ: 3,
      },
    };

    return of({
      ok: true,
      message: 'Success',
      statusCode: 200,
      data: report,
    }).pipe(delay(500));
  }
}
