import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LoginResponseType } from '../types/authresponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponseType> {
    const body = { email, password };

    return this.http.post<LoginResponseType>(`${this.apiUrl}/login`, body).pipe(
      tap((response) => {
        if (response.data?.token != null)
          localStorage.setItem('authToken', response.data.token);
      }),
      catchError((error) => {
        console.error('Error en la solicitud de login:', error);
        throw error;
      })
    );
  }
}
