import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../model/roles.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    const isAuthenticated = this.auth.isAuthenticated();

    if (state.url === '/login') {
      if (isAuthenticated) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRoles = route.data['roles'] as Role[];
    if (requiredRoles && requiredRoles.length > 0) {
      const userRole = this.auth.getRole();
      if (!userRole || !requiredRoles.includes(userRole)) {
        this.router.navigate(['/dashboard']); 
        return false;
      }
    }

    return true;
  }
}