import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Category } from '../model/categoryModel';

const BACKEND_URL = 'http://localhost:8080/assets';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders({
      'Authorization': `Basic ${token}`
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${BACKEND_URL}/categories`, {
      headers: this.getAuthHeaders()
    });
  }
}