import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../model/asset.model';
import { AssetRequest } from '../model/asset.model';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Category } from '../model/categoryModel';
import { Type } from '../model/AssetTypeModel';

const BACKEND_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient, private authService: AuthService
, private auth: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders({
      'Authorization': `Basic ${token}`
    });
  }

 getAssets(params: any): Observable<any> {
  let httpParams = new HttpParams();
  const token = this.auth.getAuthToken();
  if (!token) return of([]);
  const headers = new HttpHeaders().set('Authorization', `Basic ${token}`);

  Object.keys(params).forEach(key => {
    if (params[key] !== null && params[key] !== '') {
      httpParams = httpParams.set(key, params[key]);
    }
  });
  return this.http.get<any>('http://localhost:8080/asset', { headers, params: httpParams });
}

  addAsset(assetData: AssetRequest): Observable<Asset> {
    return this.http.post<Asset>(`${BACKEND_URL}/api/assets`, assetData, {
      headers: this.getAuthHeaders()
    });
  }
   getAllAssets(): Observable<Asset[]> {
    const token = this.auth.getAuthToken();
    if (!token) return of([]);
    const headers = new HttpHeaders().set('Authorization', `Basic ${token}`);
    return this.http.get<Asset[]>(`http://localhost:8080/asset/all`, { headers });
  }
  searchAssets(assetName: string): Observable<Asset[]> {
    const token = this.auth.getAuthToken();
    if (!token) return of([]);
    const headers = new HttpHeaders().set('Authorization', `Basic ${token}`);
    return this.http.get<Asset[]>(`http://localhost:8080/asset?assetName=${encodeURIComponent(assetName)}`, { headers });
  }
  getCategories(): Observable<Category[]> {
  const token = this.auth.getAuthToken();
  if (!token) return of([]);
  const headers = new HttpHeaders().set('Authorization', `Basic ${token}`);

  const role = this.auth.getRole();

    return this.http.get<Category[]>(`http://localhost:8080/api/categories`, { headers });

  }
      getTypes(): Observable<Type[]> {
  const token = this.auth.getAuthToken();
  if (!token) return of([]);
  const headers = new HttpHeaders().set('Authorization', `Basic ${token}`);

  const role = this.auth.getRole();

    return this.http.get<Type[]>(`http://localhost:8080/api/types`, { headers });

  }
}
