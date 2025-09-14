import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { Asset } from '../model/asset.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { category } from '../model/category.model';
import { type } from '../model/type.model';

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


    getCategories(): Observable<category[]> {
  const token = this.auth.getAuthToken();
  if (!token) return of([]);
  const headers = new HttpHeaders().set('Authorization', `Basic ${token}`);

  const role = this.auth.getRole();

    return this.http.get<category[]>(`http://localhost:8080/api/categories`, { headers });

  }
      getTypes(): Observable<type[]> {
  const token = this.auth.getAuthToken();
  if (!token) return of([]);
  const headers = new HttpHeaders().set('Authorization', `Basic ${token}`);

  const role = this.auth.getRole();

    return this.http.get<type[]>(`"http://localhost:8080/api/types`, { headers });

  }
}
