import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetailsModel } from '../model/UserDetailsModel';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private apiUrl = 'http://localhost:8080/userdetails'; // عدل URL لو مختلف

  constructor(private http: HttpClient) {}

  getUserDetails(id: number): Observable<UserDetailsModel> {
    return this.http.get<UserDetailsModel>(`${this.apiUrl}/${id}`);
  }
}
