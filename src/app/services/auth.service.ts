import { Injectable } from '@angular/core';
import { Observable, of, throwError, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
   private mockUsers = [
    { email: 'maryiamreda@orange.com', password: '12345@Am', role: 'employee' },
    { email: 'admin@orange.com', password: 'Admin@123', role: 'admin' }
  ];

    login(email: string, password: string, keepLoggedIn: boolean): Observable<any> {
        const user = this.mockUsers.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return throwError(() => new Error('Invalid credentials'));
        }

        return of(user).pipe(
            tap((foundUser) => {
                const storage = keepLoggedIn ? localStorage : sessionStorage;
                
                storage.setItem('authToken', btoa(`${email}:${password}`));
                storage.setItem('role', foundUser.role);
                
                const otherStorage = keepLoggedIn ? sessionStorage : localStorage;
                otherStorage.removeItem('authToken');
                otherStorage.removeItem('role');
                
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