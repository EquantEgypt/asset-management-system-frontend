import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetailsModel } from '../model/UserDetailsModel';
import { AuthService } from './auth.service';  

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private apiUrl = 'http://localhost:8080/api/users/details'; 

  constructor(
    private http: HttpClient,
    private authService: AuthService  
  ) {}

  getUserDetails(id: number): Observable<UserDetailsModel> {
    const token = this.authService.getAuthToken();  

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Basic ${token}`);
    }

    return this.http.get<UserDetailsModel>(`${this.apiUrl}/${id}`, { headers });
  }
}
