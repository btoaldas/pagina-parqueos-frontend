import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';

import { environment } from '@/environments/environment.prod';

import { LoginResponseType } from '../models/auth-response.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  getToken() {
    return localStorage.getItem('authToken');
  }

  getRole() {
    return localStorage.getItem('authRole');
  }

  getId() {
    return localStorage.getItem('authId');
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authRole');
    localStorage.removeItem('authId');
  }

  loginTwoFactorRequest(
    email: string,
    password: string
  ): Observable<ApiResponse<boolean>> {
    localStorage.setItem('_tempEmail', email);
    return this.http.post<ApiResponse<boolean>>(
      this.apiUrl + '/two-factor/login',
      {
        email,
        password,
      }
    );
  }

  loginTwoFactorVerify(access: string) {
    const email = localStorage.getItem('_tempEmail')!;
    return this.http
      .post<LoginResponseType>(this.apiUrl + '/two-factor/token', {
        email,
        access,
      })
      .pipe(
        tap((response) => {
          if (!response.data) return;
          localStorage.setItem('authRole', response.data.user.role);
          localStorage.setItem('authId', response.data.user.id.toString());
          localStorage.setItem('authToken', response.data.token);
        }),
        catchError((error) => {
          console.error('Error en la solicitud de login:', error);
          throw error;
        })
      );
  }

  login(email: string, password: string): Observable<LoginResponseType> {
    localStorage.setItem('authToken', 'tokentoken');

    localStorage.setItem('authRole', '');
    localStorage.setItem('authId', 'id');

    return this.http
      .post<LoginResponseType>(this.apiUrl + '/login', {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (!response.data) return;
          localStorage.setItem('authRole', response.data.user.role);
          localStorage.setItem('authId', response.data.user.id.toString());
          localStorage.setItem('authToken', response.data.token);
        }),
        catchError((error) => {
          console.error('Error en la solicitud de login:', error);
          throw error;
        })
      );
  }

  requestPassword(email: string): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      this.apiUrl + '/request-password',
      {
        email,
      }
    );
  }

  validateRequest(
    email: string,
    code: string
  ): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      this.apiUrl + '/validate-request',
      {
        email,
        code,
      }
    );
  }

  updatePassword(
    email: string,
    code: string,
    password: string
  ): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(
      this.apiUrl + '/update-password',
      {
        email,
        code,
        password,
      }
    );
  }
}
