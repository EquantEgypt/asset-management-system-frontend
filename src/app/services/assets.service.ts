import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset, Category, Type } from '../model/asset.model';
import { AuthService } from './auth.service';

export interface AssetRequest {
  assetName: string;
  brand: string;
  assetDescription?: string;
  categoryId: number;
  typeId: number;
  allStock: number;
  numberOfAvailableToAssign: number;
  numberOfMaintenance: number;
  numberOfRetired: number;
}

const BACKEND_URL = 'http://localhost:8080';

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
    return this.http.get<Asset[]>(`${BACKEND_URL}/asset`, {
      headers: this.getAuthHeaders()
    });
  }

  addAsset(assetData: AssetRequest): Observable<Asset> {
    return this.http.post<Asset>(`${BACKEND_URL}/asset/add`, assetData, {
      headers: this.getAuthHeaders()
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${BACKEND_URL}/api/category`, {
      headers: this.getAuthHeaders()
    });
  }

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(`${BACKEND_URL}/api/types`, {
      headers: this.getAuthHeaders()
    });
  }
}