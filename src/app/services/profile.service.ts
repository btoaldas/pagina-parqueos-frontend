import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ApiResponse } from '../models/api-response.model';
import { UserType } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = `${environment.apiUrl}/profile`;

  constructor(private http: HttpClient) {}

  info(): Observable<ApiResponse<UserType>> {
    const user: ApiResponse<UserType> = {
      message: 'Success',
      statusCode: 200,
      data: {
        id: 0,
        email: 'asdasd@asdasd.com',
        lastname: 'Lastname',
        name: 'Grober',
        role: 'empleado',
        state: 1,
      },
    };

    return of(user);
  }
}
