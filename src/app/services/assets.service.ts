// asset.service.ts
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, Observable, of, tap } from 'rxjs';
import { User, users, assets } from '../model/user.model';
import { Asset } from '../model/asset.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  constructor(private auth: AuthService, private router: Router,private http: HttpClient) {}

 getDisplayedAssets(): Observable<Asset[]> {
  if (!this.auth.isAuthenticated()) {
    this.router.navigate(['/login']);
    return of([]);
  }

  const userRole = this.auth.getRole();
  const currentUserEmail = this.auth.getCurrentUserEmail();

  if (userRole === 'Admin') {
    return of(assets);
  } else {
    const userAssets = assets.filter(asset => {
      const assignedUser = users.find(user => user.username === asset.assignedTo);
      return assignedUser?.email === currentUserEmail;
    });
    return of(userAssets);
  }
}

getDisplayedUsers(): Observable<User[]> {
  const token = this.auth.getAuthToken();  
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<User[]>('http://localhost:8080/auth/users',{
    headers: { Authorization: `Basic ${token}` }
  });
}


  private getCurrentUserEmail(): string | null {
    const token = this.auth.getAuthToken();
    if (!token) return null;
    
    try {
      const decoded = atob(token);
      const [email] = decoded.split(':');
      return email;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

}

 