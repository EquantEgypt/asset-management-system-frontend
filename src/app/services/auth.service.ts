  import { Injectable } from '@angular/core';
  import { Observable, tap } from 'rxjs';
  import { HttpClient } from '@angular/common/http';
  import { Router } from '@angular/router';
  import { Role } from '../model/roles.enum';

  const AUTH_TOKEN = 'AUTH_TOKEN';
  const ROLES = 'ROLES';
  const USER = 'User';
  const BACKEND_URL = 'http://192.168.1.9:8080';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {

    constructor(private http: HttpClient, private router: Router) {}

    login(email: string, password: string, keepLoggedIn: boolean): Observable<any> {
      // Encode email:password into Base64
      const basicAuthToken = btoa(`${email}:${password}`);

      // Make a request with the Authorization header 
      return this.http.post<any>(
        `${BACKEND_URL}/auth/login`,
        {}, // body
        {
          headers: { Authorization: `Basic ${basicAuthToken}` }
        }
      ).pipe(
        tap((response) => {
          const storage = keepLoggedIn ? localStorage : sessionStorage;
          storage.setItem(AUTH_TOKEN, basicAuthToken);
          localStorage.setItem(USER, JSON.stringify(response));
          this.router.navigate(['/dashboard']);
        })
      );
    }

    logout(): void {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(ROLES);
      localStorage.removeItem(USER);
      sessionStorage.removeItem(AUTH_TOKEN);
      sessionStorage.removeItem(ROLES);
      sessionStorage.removeItem(USER);
    }

    isAuthenticated(): boolean {
      return !!(localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN));
    }

    getRole(): Role | null {
      try {
        return JSON.parse(localStorage.getItem(USER) ?? 'null')?.role ?? null;
      } catch {
        return null;
      }
    }

    getCurrentUserEmail(): string | null {
      try {
        return JSON.parse(localStorage.getItem(USER) ?? 'null')?.email ?? null;
      } catch {
        return null;
      }
    }

    getAuthToken(): string | null {
      return localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN);
    }
  }
