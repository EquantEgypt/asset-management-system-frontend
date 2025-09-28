import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { AssetHistorydto } from '../model/AssetHistory.model';

const BACKEND_URL = 'http://localhost:8080/api/assets/history';

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

  getAssetHistory(id: number): Observable<AssetHistorydto[]> {
    return this.http.get<AssetHistorydto[]>(`${BACKEND_URL}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
