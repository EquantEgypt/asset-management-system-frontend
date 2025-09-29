import { Injectable } from '@angular/core';
import { Observable, tap, BehaviorSubject } from 'rxjs';
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

  // 🔑 Reactive state
  private userSubject = new BehaviorSubject<any | null>(this.getUser());
  private loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  user$ = this.userSubject.asObservable();
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string, keepLoggedIn: boolean): Observable<any> {
    const basicAuthToken = btoa(`${email}:${password}`);
    return this.http.post<any>(
      `${BACKEND_URL}/auth/login`,
      {},
      { headers: { Authorization: `Basic ${basicAuthToken}` } }
    ).pipe(
      tap((response) => {
        this.storage = keepLoggedIn ? localStorage : sessionStorage;
        this.storage.setItem(AUTH_TOKEN, basicAuthToken);
        this.storage.setItem(USER, JSON.stringify(response));

        // ✅ Push updates
        this.userSubject.next(response);
        this.loggedInSubject.next(true);

        this.router.navigate([`/dashboard`]);
      })
    );
  }

  logout(): void {
    this.storage.removeItem(AUTH_TOKEN);
    this.storage.removeItem(ROLES);
    this.storage.removeItem(USER);

    // ✅ Push logout updates
    this.userSubject.next(null);
    this.loggedInSubject.next(false);

    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.storage.getItem(AUTH_TOKEN);
  }

  getRole(): Role | null {
    const userStr = this.storage.getItem(USER);
    if (!userStr) return null;
    const user = JSON.parse(userStr);
    return user?.role ?? null;
  }

  getAuthToken(): string | null {
    return this.storage.getItem(AUTH_TOKEN);
  }

  getUser(): any {
    const userStr = this.storage.getItem(USER);
    return userStr ? JSON.parse(userStr) : null;
  }
}
