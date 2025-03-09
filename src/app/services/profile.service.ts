import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { environment } from '@/environments/environment.prod';

import { ApiResponse } from '../models/api-response.model';
import { UserType } from '../models/user.model';

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
}
