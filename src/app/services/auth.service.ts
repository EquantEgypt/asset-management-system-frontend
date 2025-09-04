import { Injectable } from '@angular/core';
import { Observable, of, throwError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(private http: HttpClient) {}

   private mockUsers = [
    { email: 'maryiamreda@orange.com', password: '12345@Am', role: 'employee' },
    { email: 'admin@orange.com', password: 'Admin@123', role: 'admin' }
  ];

login(email: string, password: string, keepLoggedIn: boolean): Observable<any> {
  // Encode email:password into Base64
  const basicAuthToken = btoa(`${email}:${password}`);

  // Make a request with the Authorization header (optional: to verify credentials)
  return this.http.post<any>(
  'http://localhost:8080/auth/login',
  {},  // body (empty if not needed)
  {
    headers: { Authorization: `Basic ${basicAuthToken}` }
  }
).pipe(
  tap((response) => {
    const storage = keepLoggedIn ? localStorage : sessionStorage;
    storage.setItem('authToken', basicAuthToken);
    storage.setItem('role', response.role.toLowerCase());
  })
);

}



    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('role');
        console.log('User logged out');
    }

    isAuthenticated(): boolean {
        return !!(localStorage.getItem('authToken') || sessionStorage.getItem('authToken'));
    }

    getRole(): string | null {
        return localStorage.getItem('role') || sessionStorage.getItem('role');
    }

    getAuthToken(): string | null {
        return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    }
}