import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../model/roles.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['roles'] as Role[];

    if (state.url === '/login') {
      if (this.auth.isAuthenticated()) {

        this.router.navigate(['/dashboard']);
        return false;  // block access
      }
      return true;
    }

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;  // block access
    }
    if (requiredRoles) {
      const role = this.auth.getRole();
      if (!role || !requiredRoles.includes(role)) {
        return false;
      }
    }
    return true;
  }
}
