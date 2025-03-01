import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, of, throwError, delay } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ApiResponse } from '../models/api-response.model';
import { UserCreateType, UserType } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  switchUser(id: number): Observable<ApiResponse<boolean>> {
    return of({
      message: 'Success',
      statusCode: 200,
      data: true,
    }).pipe(delay(150));
  }

  createOne(data: UserCreateType): Observable<ApiResponse<boolean>> {
    return of({
      message: 'Success',
      statusCode: 200,
      data: true,
    }).pipe(delay(500));
  }

  updateOne(
    id: number,
    data: UserCreateType
  ): Observable<ApiResponse<boolean>> {
    return of({
      message: 'Success',
      statusCode: 200,
      data: true,
    }).pipe(delay(500));
  }

  getOneById(id: number): Observable<ApiResponse<UserType>> {
    const u = users.find((user) => user.id === id);

    if (u == null)
      return throwError(() => {
        throw new Error();
      });

    return of({
      message: 'Success',
      statusCode: 200,
      data: u,
    }).pipe(delay(500));
  }

  getUserByText(text: string): Observable<ApiResponse<Array<UserType>>> {
    const u = users.filter(
      ({ email, lastname, name }) =>
        email.toLowerCase().includes(text) ||
        lastname.toLowerCase().includes(text) ||
        name.toLowerCase().includes(text)
    );

    return of({
      message: 'Success',
      statusCode: 200,
      data: u,
    }).pipe(delay(100));
  }
}

const users: Array<UserType> = [
  {
    id: 1,
    email: 'admin@asd',
    name: 'Admin-name',
    lastname: 'Admin',
    role: 'admin',
    state: 1,
  },
  {
    id: 2,
    email: 'empleado@asd',
    name: 'E-name',
    lastname: 'E-name',
    role: 'empleado',
    state: 1,
  },
  {
    id: 3,
    email: 'cliente@asd',
    name: 'C-name',
    lastname: 'C-last',
    role: 'cliente',
    state: 1,
  },
  {
    id: 4,
    email: 'cancel@asd',
    name: 'Cancel',
    lastname: 'Canlastna',
    role: 'cliente',
    state: 0,
  },
  {
    id: 5,
    email: 'admin1@asd',
    name: 'A-name',
    lastname: 'A-last',
    role: 'admin',
    state: 1,
  },
];
