import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  ApiUrl = 'http://localhost:1111/api/sub_category/';
  constructor(private http: HttpClient) { }
  
  getSubCategory(token:any):Observable<any> {
    const  headers  = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.ApiUrl}`, { headers });
  }
  
  postSubCategory(token: any,category_id:number,sub_category_name:string,added_by:string,status:number):Observable<any> {
    const body = { category_id, sub_category_name, added_by, status };
    const headers = new HttpHeaders().set('Authorization', `Bearar ${token}`);
    return this.http.post<any>(`${this.ApiUrl}`, body, { headers });
  }

  updateSubCategory(token: any,id:number ,category_id: number, sub_category_name: string, added_by: string, status: number):Observable<any> {
    const body = { category_id, sub_category_name, added_by, status };
    const headers = new HttpHeaders().set('Authorization', `Bearar ${token}`);
    return this.http.put<any>(`${this.ApiUrl}${id}`,body,{headers})
  } 

  deleteSubCategory(token: any,id:number):Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearar ${token}`);
    return this.http.delete<any>(`${this.ApiUrl}${id}`, {headers});
  }
}
