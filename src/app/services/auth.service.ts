import { Injectable } from '@angular/core';
import { Observable, of, throwError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {


constructor(private http: HttpClient, private router:Router) {}

   

login(email: string, password: string, keepLoggedIn: boolean): Observable<any> {
  // Encode email:password into Base64
  const basicAuthToken = btoa(`${email}:${password}`);

  // Make a request with the Authorization header 
  return this.http.post<any>(
  'http://localhost:8080/auth/login',
  {},  // body 
  {
    headers: { Authorization: `Basic ${basicAuthToken}` }
  }
).pipe(
  tap((response) => {
    const storage = keepLoggedIn ? localStorage : sessionStorage;
    storage.setItem('authToken', basicAuthToken);
    const role = response.role?.roleType;
  if (role) {
    storage.setItem('role', role);
  }
      this.router.navigate([`/dashboard`]);
  })
);
}
    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('role');
    }

    isAuthenticated(): boolean {
        return !!(localStorage.getItem('authToken') || sessionStorage.getItem('authToken'));
    }

getRole():string | null {
  return (localStorage.getItem('role') || sessionStorage.getItem('role')) as
    | "Employee"
    | "Admin"
    | "Department_Manager"
    | null;
}

    getAuthToken(): string | null {
        return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    }
}