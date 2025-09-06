import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { RoleType } from "../model/RoleTypes";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

canActivate(route: ActivatedRouteSnapshot): boolean {
  if (!this.auth.isAuthenticated()) {
    this.router.navigate(['/login']);
    return false;
  }

  const requiredRoles = route.data['roles'] as RoleType[];
  const userRole = this.auth.getRole();

  if (userRole && requiredRoles.includes(userRole as RoleType)) {
    return true;
  }
console.log('AuthGuard:', this.auth.isAuthenticated());
console.log('RoleGuard: userRole=', userRole, 'required=', requiredRoles);

  // Role mismatch : go to login
  this.router.navigate(['/login']);
  return false;
}


}
