import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  ApiUrl = 'http://localhost:1111/api/products/';
  constructor(private http: HttpClient) { }
  getProduct(token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.ApiUrl}`, { headers });
  }
  
  postProduct(token: any, formdata : any):Observable<any>{
    // const body = { category_id, sub_category_id, product_name, description, price, imageurl, added_by, status };
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.ApiUrl}`, formdata, { headers });
  }
}
