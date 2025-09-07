import { Injectable } from '@angular/core';
import { Observable, of, throwError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



const AUTH_TOKEN = 'AUTH_TOKEN';
const ROLES = 'ROLES';

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
    storage.setItem(AUTH_TOKEN, basicAuthToken);
    const role = response.role?.roleType;
  if (role) {
    storage.setItem(ROLES, role);
  }
      this.router.navigate([`/dashboard`]);
  })
);
}
    logout(): void {
        localStorage.removeItem(AUTH_TOKEN);
        localStorage.removeItem(ROLES);
        sessionStorage.removeItem(AUTH_TOKEN);
        sessionStorage.removeItem(ROLES);
    }

    isAuthenticated(): boolean {
        return !!(localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN));
    }

getRole():string | null {
  return (localStorage.getItem(ROLES) || sessionStorage.getItem(ROLES)) as
    | "Employee"
    | "Admin"
    | "Department_Manager"
    | null;
}

getCurrentUserEmail(){
    return (localStorage.getItem('email') || sessionStorage.getItem('email'))
}
    getAuthToken(): string | null {
        return localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN);
    }
}