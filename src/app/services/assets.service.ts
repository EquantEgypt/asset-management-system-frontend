// asset.service.ts
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
<<<<<<< HEAD
import { map, Observable, of, tap } from 'rxjs';
import { User, users, assets } from '../model/user.model';
import { Asset } from '../model/asset.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
=======
import { Observable, of } from 'rxjs';
import { User, users, assets } from '../model/user.model';
import { Asset } from '../model/asset.model';
>>>>>>> 5bf3ff21afccd43f6c0d3a6ff765732d0c1960ff

@Injectable({
  providedIn: 'root'
})
export class AssetService {
<<<<<<< HEAD
  constructor(private auth: AuthService, private router: Router,private http: HttpClient) {}
=======
  constructor(private auth: AuthService, private router: Router) {}
>>>>>>> 5bf3ff21afccd43f6c0d3a6ff765732d0c1960ff

 getDisplayedAssets(): Observable<Asset[]> {
  if (!this.auth.isAuthenticated()) {
    this.router.navigate(['/login']);
    return of([]);
  }

<<<<<<< HEAD
  const userRole = this.auth.getRole();
  const currentUserEmail = this.auth.getCurrentUserEmail();
=======
 
  const userRole = this.auth.getRole();
  const currentUserEmail = this.getCurrentUserEmail();
>>>>>>> 5bf3ff21afccd43f6c0d3a6ff765732d0c1960ff

  if (userRole === 'Admin') {
    return of(assets);
  } else {
    const userAssets = assets.filter(asset => {
      const assignedUser = users.find(user => user.username === asset.assignedTo);
      return assignedUser?.email === currentUserEmail;
    });
    return of(userAssets);
<<<<<<< HEAD
  }
}

getDisplayedUsers(): Observable<User[]> {
  const token = this.auth.getAuthToken();  
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<User[]>('http://localhost:8080/auth/users',{
    headers: { Authorization: `Basic ${token}` }
  });
}

=======

    
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
>>>>>>> 5bf3ff21afccd43f6c0d3a6ff765732d0c1960ff

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

<<<<<<< HEAD
=======

export { assets, users };
>>>>>>> 5bf3ff21afccd43f6c0d3a6ff765732d0c1960ff
 