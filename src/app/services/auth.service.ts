import { Injectable } from '@angular/core';
import { Observable, of, throwError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Role } from '../model/roles.enum';
const AUTH_TOKEN = 'AUTH_TOKEN';
const ROLES = 'ROLES';
const USER = 'User';
const BACKEND_URL = 'http://localhost:8080';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storage: Storage = sessionStorage;

  constructor(private http: HttpClient, private router: Router) { }
  login(email: string, password: string, keepLoggedIn: boolean): Observable<any> {
    // Encode email:password into Base64
    const basicAuthToken = btoa(`${email}:${password}`);
    // Make a request with the Authorization header
    return this.http.post<any>(
      `${BACKEND_URL}/auth/login`,
      {},  // body
      {
        headers: { Authorization: `Basic ${basicAuthToken}` }
      }
    ).pipe(
      tap((response) => {
        this.storage = keepLoggedIn ? localStorage : sessionStorage;
        this.storage.setItem(AUTH_TOKEN, basicAuthToken);
        this.storage.setItem(USER, JSON.stringify(response));
        this.router.navigate([`/dashboard`]);
      })
    );
  }
  logout(): void {
    this.storage.removeItem(AUTH_TOKEN);
    this.storage.removeItem(ROLES);
  }
  isAuthenticated(): boolean {
    return !!(this.storage.getItem(AUTH_TOKEN));
  }
  getRole(): Role | null {
    const userStr = this.storage.getItem(USER);
    if (!userStr) {
      return null;
    }
    const user = JSON.parse(userStr);
    return user?.role ?? null;
  }

  getCurrentUserId(): number | null {
    const userStr = this.storage.getItem(USER);
    if (!userStr) {
      return null;
    }
    const user = JSON.parse(userStr);
    return user?.id ?? null;
  }

    getCurrentUsername(): string | null {
    const userStr = this.storage.getItem(USER);
    if (!userStr) {
      return null;
    }
    const user = JSON.parse(userStr);
    return user?.username ?? null;
  }

  getAuthToken(): string | null {
    return this.storage.getItem(AUTH_TOKEN);
  }
}