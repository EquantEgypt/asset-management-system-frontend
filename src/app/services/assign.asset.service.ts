import { Observable, of, throwError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AssetAssignment } from '../model/asset.model';
import { AuthService } from './auth.service';
import { User } from '../model/user.model';
const BACKEND_URL = 'http://localhost:8080/asset-assignments';
@Injectable({
  providedIn: 'root'
})
export class AssignAssetService {
  userToAssign:User|null=null;
  constructor(private http: HttpClient, private auth: AuthService) { }
  assignAsset(formData: AssetAssignment): Observable<string> {
        const token = this.auth.getAuthToken();

      return this.http.post(`${BACKEND_URL}`, formData, {
      headers: { Authorization: `Basic ${token}` },
      responseType: 'text', 
      });
    }
}