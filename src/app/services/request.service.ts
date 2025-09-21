import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request, RequestView } from '../model/request.model';
import { AuthService } from './auth.service';
import { Page } from '../model/Page.model';

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

  getRequests(page: number, size: number): Observable<Page<RequestView>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<RequestView>>(`${BACKEND_URL}`, {
      headers: this.getAuthHeaders(),
      params
    });
  }
}