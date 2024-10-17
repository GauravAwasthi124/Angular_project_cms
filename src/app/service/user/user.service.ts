import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:1111/api/users/';
  constructor(private http: HttpClient) { }
  
  getUsers(token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}`, {headers});
  }
  postUsers(token: any, name: string, email: string, userrole: string, password: string, status: number): Observable<any>{
    const body = { name, email, password, userrole, status };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}`,body ,{ headers });
  }

  updateUsers(token: any,id:number,name:string,email:string,userrole:string, password:string , status:number):Observable<any> {
    const body = { name, email, password, userrole, status };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}${id}`,body,{headers});
  }

  deleteUsers(token: any, id:number): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}${id}`, { headers });
  }
}
