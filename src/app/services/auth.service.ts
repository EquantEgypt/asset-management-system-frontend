import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://localhost:8080';

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(`${username}:${password}`)
        });
        console.log("reached here");
        return this.http.post<any>(`${this.apiUrl}/tasks`, {}, { headers }).pipe(
      tap(() => {
        // mark user as logged in
        localStorage.setItem('authToken', btoa(`${username}:${password}`));
      })
    );
    }

    logout(): void {
        // Implement logout logic if needed
        // For example, remove tokens from localStorage
        localStorage.removeItem('authToken');
    }
    isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }
}