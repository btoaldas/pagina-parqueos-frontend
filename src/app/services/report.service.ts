import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, of, throwError, delay } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LoginResponseType } from '../models/auth-response.model';
import { MainReportType } from '../models/report.model';
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
}
