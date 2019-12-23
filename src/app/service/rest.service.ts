import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.apiBaseUrl;
  
  get<T>(url): Observable<any> {
      return this.http.get<T>(this.baseUrl + url);
  }
  getWithParams<T>(url, params): Observable<any> {
      return this.http.get<T>(this.baseUrl + url, { params: params });
  }
  post<T>(url, params = {}): Observable<any> {
      return this.http.post<T>(this.baseUrl + url, params);
  }
  put<T>(url, params = {}): Observable<any> {
      return this.http.put<T>(this.baseUrl + url, params);
  }
  patch<T>(url, params = {}): Observable<any> {
      return this.http.patch<T>(this.baseUrl + url, params);
  }
  delete<T>(url): Observable<any> {
      return this.http.delete<T>(this.baseUrl + url);
  }
  upload(url, file: File): Observable<any> {
      const formData = new FormData();
      formData.append('avatar', file);
      const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
      return this.http.put(this.baseUrl + url, formData, { headers: headers });
  }
  uploadWithData(url, data) {
      const formData = new FormData();
      for (let item in data) {
          if (data.hasOwnProperty(item)) {
              formData.append(item, data[item]);
          }
      }
      const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
      return this.http.post(this.baseUrl + url, formData, { headers: headers });
  }
  getBaseUrl() {
      return this.baseUrl;
  }
}