import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AssetHistorydto } from '../model/AssetHistory.model';

const BACKEND_URL = 'http://localhost:8080/api/assets/history';
export interface Page<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}
@Injectable({
  providedIn: 'root'
})
export class AssetHistoryService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders({
      'Authorization': `Basic ${token}`
    });
  }

  getAssetHistory(id: number , page: number, size: number): Observable<Page<AssetHistorydto>> {
    return this.http.get<Page<AssetHistorydto>>(`${BACKEND_URL}/${id}?page=${page}&size=${size}`, {
      headers: this.getAuthHeaders()
    });
  }
}