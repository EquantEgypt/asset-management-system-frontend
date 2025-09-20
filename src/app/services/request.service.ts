import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../model/request.model';
import { AuthService } from './auth.service';

const BACKEND_URL = 'http://localhost:8080/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getAuthToken();
    return new HttpHeaders({
      'Authorization': `Basic ${token}`
    });
  }

  addRequest(requestData: Request): Observable<Request> {
    return this.http.post<Request>(`${BACKEND_URL}`, requestData, {
      headers: this.getAuthHeaders()
    });
  }
}