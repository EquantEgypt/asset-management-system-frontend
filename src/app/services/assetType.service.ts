import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { Type } from '../model/AssetTypeModel';

const BACKEND_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders({
      'Authorization': `Basic ${token}`
    });
  }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${BACKEND_URL}/api/types`, {
      headers: this.getAuthHeaders()
    });
  }
}