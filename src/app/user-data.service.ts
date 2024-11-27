// user-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private apiUrl = 'http://localhost:3001/api/users';

  constructor(private http: HttpClient) {}

  sendUserData(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
}
