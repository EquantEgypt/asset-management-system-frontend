import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Department } from "../model/department.model";

const BACKEND_URL = 'http://192.168.1.2:8080/api/departments';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  constructor(private http: HttpClient, private auth: AuthService) { }
  getDepartmentsName(): Observable<Department[]> {
    const token = this.auth.getAuthToken();
    return this.http.get<Department[]>(`${BACKEND_URL}`, {
      headers: { Authorization: `Basic ${token}` }
    });
  }

}