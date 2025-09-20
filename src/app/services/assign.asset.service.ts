import { Observable, of, throwError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Role } from '../model/roles.enum';
import { Injectable } from '@angular/core';
import { Asset, AssetAssignment, AssetRequest } from '../model/asset.model';
import { AuthService } from './auth.service';
const AUTH_TOKEN = 'AUTH_TOKEN';
const ROLES = 'ROLES';
const USER = 'User';
const BACKEND_URL = 'http://localhost:8080/asset-assignments';
@Injectable({
  providedIn: 'root'
})
export class AssignAssetService {
  private storage: Storage = sessionStorage;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) { }
  assignAsset(formData: AssetAssignment): Observable<any> {
        const token = this.auth.getAuthToken();

      return this.http.post<any>(`${BACKEND_URL}`, formData, {
      headers: { Authorization: `Basic ${token}` },
      });
    }
}