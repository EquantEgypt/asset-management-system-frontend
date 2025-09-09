// asset.service.ts
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Observable, of } from 'rxjs';
import { User, users, assets } from '../model/user.model';
import { Asset } from '../model/asset.model';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  constructor(private auth: AuthService, private router: Router) {}

 getDisplayedAssets(): Observable<Asset[]> {
  if (!this.auth.isAuthenticated()) {
    this.router.navigate(['/login']);
    return of([]);
  }

 
  const userRole = this.auth.getRole();
  const currentUserEmail = this.getCurrentUserEmail();

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
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return of([]);
    }

    const userRole = this.auth.getRole();
    
    if (userRole === 'Admin') {
      return of(users);
    } else {
      return of([]);
    }
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


export { assets, users };
 