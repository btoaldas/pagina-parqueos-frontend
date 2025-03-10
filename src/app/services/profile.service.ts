import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap, throwError } from 'rxjs';

import { environment } from '@/environments/environment.prod';

import { ApiResponse } from '../models/api-response.model';
import { UserType } from '../models/user.model';
import { FineProfile } from '../models/fine.model';
import { TicketProfile } from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) {}

  updateInfo(name: string, lastname: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<true>>(this.apiUrl + '/update', {
      name,
      lastname,
    });
  }

  info(): Observable<ApiResponse<UserType>> {
    return this.http.get<ApiResponse<UserType>>(this.apiUrl);
  }

  tickets(): Observable<ApiResponse<TicketProfile[]>> {
    return this.http
      .get<ApiResponse<TicketProfile[]>>(this.apiUrl + '/tickets')
      .pipe(
        tap((response) => {
          if (!response.data) return;
          const tickets = response.data;
          tickets.map((t) => {
            t.entry_date = new Date(t.entry_date);
            t.max_date = new Date(t.max_date);
          });
        })
      );
  }

  fines(): Observable<ApiResponse<FineProfile[]>> {
    return this.http.get<ApiResponse<FineProfile[]>>(this.apiUrl + '/fines');
  }

  updatePassword(
    password: string,
    newPassword: string
  ): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(this.apiUrl + '/password', {
      password,
      'new-password': newPassword,
    });
  }
}
