import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LoginResponseType } from '../models/auth-response.model';

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

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authRole');
    localStorage.removeItem('authId');
  }

  login(email: string, password: string): Observable<LoginResponseType> {
    if (email.toLowerCase().startsWith('error'))
      return throwError(() => new Error('Credenciales Incorrectas'));

    const data: LoginResponseType = {
      message: 'Success',
      statusCode: 200,
      data: {
        token: 'xdxdxdxdxdxdxdxd',
        user: {
          email,
          id: 0,
          lastname: 'Lastname',
          name: 'Grober',
          role: 'empleado',
          state: 1,
        },
      },
    };

    localStorage.setItem('authToken', 'tokentoken');

    let role = 'cliente';
    if (email.toLowerCase().startsWith('admin')) role = 'admin';
    else if (email.toLowerCase().startsWith('empleado')) role = 'empleado';
    localStorage.setItem('authRole', role);
    localStorage.setItem('authId', 'id');

    return of(data);
  }

  /* login(email: string, password: string): Observable<LoginResponseType> {
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
  } */
}
