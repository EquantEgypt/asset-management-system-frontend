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
        const storage = keepLoggedIn ? localStorage : sessionStorage;
        storage.setItem(AUTH_TOKEN, basicAuthToken);
        localStorage.setItem(USER, JSON.stringify(response));
        this.router.navigate([`/dashboard`]);
      })
    );
  }
<<<<<<< HEAD
).pipe(
  tap((response) => {
    const storage = keepLoggedIn ? localStorage : sessionStorage;
    storage.setItem('authToken', basicAuthToken);
        storage.setItem('email', email);

    const role = response.role?.roleType;
  if (role) {
    storage.setItem('role', role);
=======
  logout(): void {
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(ROLES);
    sessionStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem(ROLES);
>>>>>>> 5bf3ff21afccd43f6c0d3a6ff765732d0c1960ff
  }

  isAuthenticated(): boolean {
    return !!(localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN));
  }

<<<<<<< HEAD
getRole():string | null {
  return (localStorage.getItem('role') || sessionStorage.getItem('role')) as
    | "Employee"
    | "Admin"
    | "Department_Manager"
    | null;
}

getCurrentUserEmail(){
    return (localStorage.getItem('email') || sessionStorage.getItem('email'))
}
    getAuthToken(): string | null {
        return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
=======
  getRole(): Role | null {
    try {
      return JSON.parse(localStorage.getItem(USER) ?? 'null')?.role ?? null;
    } catch {
      return null;
>>>>>>> 5bf3ff21afccd43f6c0d3a6ff765732d0c1960ff
    }
  }



  getAuthToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN) || sessionStorage.getItem(AUTH_TOKEN);
  }
}