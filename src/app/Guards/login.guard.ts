import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      // already logged in: redirect to dashboard
      const role= this.auth.getRole();
      this.router.navigate([`/${role?.toLowerCase()}-dashboard`]);
      
      return false;
    }
    return true; // allow access to login
  }
}
