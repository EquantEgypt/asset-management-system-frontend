import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { Asset } from '../model/asset.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  getDisplayedUsers(): Observable<User[]> {
    const token = this.auth.getAuthToken();
    if (!token) return of([]);
    const headers = new HttpHeaders().set('Authorization', `Basic ${token}`);
    return this.http.get<User[]>('http://localhost:8080/auth/users', { headers });
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

  getAssetsByRole(): Observable<Asset[]> {
    const token = this.auth.getAuthToken();
    if (!token) return of([]);
    const headers = new HttpHeaders().set('Authorization', `Basic ${token}`);
    return this.http.get<Asset[]>(`http://localhost:8080/asset/all`, { headers });
  }
}
