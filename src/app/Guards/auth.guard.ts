import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiresAuth = route.data['requiresAuth'] === true;

    if (requiresAuth && !this.auth.isAuthenticated()) {
      this.router.navigate(['/users/login']);
      return false;
    }

    if (!requiresAuth && this.auth.isAuthenticated()) {
      this.router.navigate(['/users/me/tasks']);
      return false;
    }

    return true;
  }
}
