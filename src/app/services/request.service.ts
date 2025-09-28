import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request, RequestView } from '../model/request.model';
import { AuthService } from './auth.service';
import { Page } from '../model/Page.model';

const BACKEND_URL = 'http://localhost:8080/requests';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient, private authService: AuthService) { }

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

  getRequests(
  endpoint: 'pending' | 'history' | 'my-requests' | '', 
  page: number,
  size: number,
  type?: string | null,
  search?: string,
  status?: string | null,
  personal?: boolean
): Observable<Page<RequestView>> {
  let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

  if (status)   params = params.set('status', status);
  if (type)     params = params.set('type', type);
  if (search)   params = params.set('search', search);
  if (personal) params = params.set('personal', String(personal));

  const url = endpoint ? `${BACKEND_URL}/${endpoint}` : BACKEND_URL;

  return this.http.get<Page<RequestView>>(url, {
    headers: this.getAuthHeaders(),
    params
  });
}

  respondToRequest(requestId: number, requestType: string, accepted: string,rejectionNote?:string): Observable<RequestView> {
    console.log(requestId, requestType);
    const url = `${BACKEND_URL}/response`;
    return this.http.put<RequestView>(
      url,
      { id: requestId, status: accepted == 'APPROVED' ? 'APPROVED' : 'REJECTED',rejectionNote },
      { headers: this.getAuthHeaders() }
    );
  }
  respondToRequest(requestId: number, requestType: string, accepted: string): Observable<RequestView> {
    console.log(requestId, requestType);
    const url = `${BACKEND_URL}/response`;
    return this.http.put<RequestView>(
      url,
      { id: requestId, status: accepted == 'APPROVED' ? 'APPROVED' : 'REJECTED' },
      { headers: this.getAuthHeaders() }
    );
  }
}