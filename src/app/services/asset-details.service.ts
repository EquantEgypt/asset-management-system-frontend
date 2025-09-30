import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssetDetailsdto } from '../model/AssetDetails.model';
import { AuthService } from './auth.service';

const BACKEND_URL = 'http://localhost:8080/api/assets/details';

@Injectable({
  providedIn: 'root'
})
export class AssetDetailsService {

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

  getAssetDetails(id: number): Observable<AssetDetailsdto> {
    return this.http.get<AssetDetailsdto>(`${BACKEND_URL}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}