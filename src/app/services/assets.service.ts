import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Asset } from '../model/asset.model';
import { AuthService } from './auth.service';
import { AssetRequest } from '../model/asset.model';
import { AssetListDTO } from '../model/asset-list-dto.model';
import { Page } from '../model/Page.model';

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

getAssets(filter?: any): Observable<Page<AssetListDTO>> {
  let params = new HttpParams();

  if (filter) {
    Object.keys(filter).forEach(key => {
      const value = (filter as any)[key];
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });
  }

  return this.http.get<Page<AssetListDTO>>(`${BACKEND_URL}`, {
    headers: this.getAuthHeaders(),
    params
  });
}


  addAsset(assetData: AssetRequest): Observable<Asset> {
    return this.http.post<Asset>(`${BACKEND_URL}`, assetData, {
      headers: this.getAuthHeaders()
    });
  }
 getAvAssets(assetType?:string): Observable<Asset[]> {
  let params = new HttpParams();
  if (assetType && assetType.trim() !== '') {
      params = params.set('type', assetType);
    }
   return this.http.get<Asset[]>(`${BACKEND_URL}/available`,{
      headers: this.getAuthHeaders(),
      params
    });
  }
}
