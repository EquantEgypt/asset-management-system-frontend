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

    login(email: string, password: string): Observable<any> {
        const user = this.mockUsers.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return throwError(() => new Error('Invalid credentials'));
        }

        // Return the user wrapped in Observable with tap for side effects
        return of(user).pipe(
            tap((foundUser) => {
                // Store auth token and role in localStorage
                localStorage.setItem('authToken', btoa(`${email}:${password}`));
                localStorage.setItem('role', foundUser.role);
                console.log('User logged in successfully:', foundUser);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('role');
        console.log('User logged out');
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('authToken');
    }

    getRole(): string | null {
        return localStorage.getItem('role');
    }
}