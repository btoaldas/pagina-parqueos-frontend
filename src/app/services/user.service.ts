import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, of, throwError, delay } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { UserCreateType, UserType } from '../models/user.model';
import { environment } from '@/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {}

  switchUser(id: number, switchTo: number): Observable<ApiResponse<boolean>> {
    if (switchTo)
      return this.http.post<ApiResponse<boolean>>(
        this.apiUrl + `/${id}/enable`,
        {}
      );
    return this.http.post<ApiResponse<boolean>>(
      this.apiUrl + `/${id}/disable`,
      {}
    );
  }

  createOne(data: UserCreateType): Observable<ApiResponse<boolean>> {
    return this.http.post<ApiResponse<boolean>>(this.apiUrl, data);
  }

  updateOne(
    id: number,
    data: UserCreateType
  ): Observable<ApiResponse<boolean>> {
    return this.http.put<ApiResponse<boolean>>(this.apiUrl + '/' + id, data);
  }

  getOneById(id: number): Observable<ApiResponse<UserType>> {
    return this.http.get<ApiResponse<UserType>>(this.apiUrl + '/' + id);
  }

  getUserByText(text: string): Observable<ApiResponse<Array<UserType>>> {
    return this.http.get<ApiResponse<Array<UserType>>>(
      this.apiUrl + '?filter=' + text
    );
  }
}
