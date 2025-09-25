import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset } from '../model/asset.model';
import { AuthService } from './auth.service';
import { AssetRequest } from '../model/asset.model';

const BACKEND_URL = 'http://localhost:8080/assets';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders({
      'Authorization': `Basic ${token}`
    });
  }

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${BACKEND_URL}/all`, {
      headers: this.getAuthHeaders()
    });
  }

  getAssetById(id: number): Observable<Asset> {
    return this.http.get<Asset>(`${BACKEND_URL}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  addAsset(assetData: AssetRequest): Observable<Asset> {
    return this.http.post<Asset>(`${BACKEND_URL}`, assetData, {
      headers: this.getAuthHeaders()
    });
  }

  updateAsset(id: number, assetData: AssetRequest): Observable<Asset> {
    return this.http.put<Asset>(`${BACKEND_URL}/${id}`, assetData, {
      headers: this.getAuthHeaders()
    });
  }
}