import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LoginResponseType } from '../types/authresponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

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
    if (email.toLocaleLowerCase().startsWith('admin'))
      localStorage.setItem('authRole', 'admin');
    else if (email.toLocaleLowerCase().startsWith('empleado'))
      localStorage.setItem('authRole', 'empleado');
    else localStorage.setItem('authRole', 'cliente');
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
