import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:1111/api/user/';

  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}login`, body);
  }

 profileUser(token: any): Observable<any> {
  if (!token) {
    throw new Error('Token is required');
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post<any>(`${this.apiUrl}profile`, {}, { headers });
}

}
