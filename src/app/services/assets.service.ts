import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Asset } from '../model/asset.model';
import { AuthService } from './auth.service';
import { AssetRequest } from '../model/asset.model';
import { MiniAsset } from '../model/MiniAsset.model';
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

  getAssets(): Observable<Page<MiniAsset>> {
    return this.http.get<Page<MiniAsset>>(`${BACKEND_URL}`, {
      headers: this.getAuthHeaders()
    });
  }

  addAsset(assetData: AssetRequest): Observable<Asset> {
    return this.http.post<Asset>(`${BACKEND_URL}`, assetData, {
      headers: this.getAuthHeaders()
    });
  }
 getAvAssets(): Observable<Asset[]> {
   return this.http.get<Asset[]>(`${BACKEND_URL}/available`,{
      headers: this.getAuthHeaders()
    });
  }
  
   
}

export const Assets: any[] = [
  {
    "id": 1,
    "category": {
      "id": 1,
      "name": "IT Equipment"
    },
    "type": {
      "id": 1,
      "name": "Laptop"
    },
    "brand": "Dell",
    "description": "High-performance laptop with Intel i7 processor, 16GB RAM, 512GB SSD",
    "name": "Dell Latitude 5520",
    "location": "Floor 3, Room 302",
    "serialNumber": "DL5520-2024-001",
    "purchaseDate": "2024-01-15T10:30:00",
    "warrantyEndDate": "2027-01-15T10:30:00",
    "status": "ACTIVE",
    "imagePath": "/assets/images/dell-laptop.jpg"
  },
  {
    "id": 2,
    "category": {
      "id": 1,
      "name": "IT Equipment"
    },
    "type": {
      "id": 2,
      "name": "Printer"
    },
    "brand": "HP",
    "description": "Multi-function color laser printer with wireless connectivity",
    "name": "HP LaserJet Pro MFP M479fdw",
    "location": "Floor 2, Print Room",
    "serialNumber": "HP479-2023-012",
    "purchaseDate": "2023-08-22T14:15:00",
    "warrantyEndDate": "2026-08-22T14:15:00",
    "status": "ACTIVE",
    "imagePath": "/assets/images/hp-printer.jpg"
  },
  {
    "id": 3,
    "category": {
      "id": 2,
      "name": "Furniture"
    },
    "type": {
      "id": 3,
      "name": "Office Chair"
    },
    "brand": "Herman Miller",
    "description": "Ergonomic office chair with lumbar support and adjustable armrests",
    "name": "Herman Miller Aeron Chair",
    "location": "Floor 4, Workstation 25",
    "serialNumber": "HM-AERON-2024-025",
    "purchaseDate": "2024-03-10T09:00:00",
    "warrantyEndDate": "2036-03-10T09:00:00",
    "status": "ALLOCATED",
    "imagePath": "/assets/images/herman-miller-chair.jpg"
  },
  {
    "id": 4,
    "category": {
      "id": 3,
      "name": "Vehicles"
    },
    "type": {
      "id": 4,
      "name": "Company Car"
    },
    "brand": "Toyota",
    "description": "Fuel-efficient sedan for business travel and client meetings",
    "name": "Toyota Camry 2024",
    "location": "Parking Lot B, Space 15",
    "serialNumber": "TOY-CAM-2024-B15",
    "purchaseDate": "2024-05-20T11:45:00",
    "warrantyEndDate": "2027-05-20T11:45:00",
    "status": "AVAILABLE",
    "imagePath": "/assets/images/toyota-camry.jpg"
  },
  {
    "id": 5,
    "category": {
      "id": 1,
      "name": "IT Equipment"
    },
    "type": {
      "id": 5,
      "name": "Monitor"
    },
    "brand": "LG",
    "description": "27-inch 4K UltraHD monitor with USB-C connectivity",
    "name": "LG 27UP850-W",
    "location": "Floor 1, Reception Desk",
    "serialNumber": "LG27UP-2023-REC",
    "purchaseDate": "2023-11-08T13:20:00",
    "warrantyEndDate": "2025-11-08T13:20:00",
    "status": "MAINTENANCE",
    "imagePath": "/assets/images/lg-monitor.jpg"
  }
];