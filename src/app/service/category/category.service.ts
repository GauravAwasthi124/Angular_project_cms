import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:1111/api/category/';
  constructor(private http: HttpClient) { }

  getCategory(token: any): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}`, { headers });
  }
  
  postCategory(token: any, category_name: string, added_by: string, status: number): Observable<any>{
    const body = { category_name, added_by, status };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}`, body, { headers });
  }
  
  updateCategory(token:any,id:number,category_name:string,added_by:string,status:number):Observable<any>{
    const body = { category_name,added_by ,status };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}${id}`, body, { headers });
  }

  deleteCategory(token: any, id: number): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiUrl}${id}`,{headers})
  }
}
