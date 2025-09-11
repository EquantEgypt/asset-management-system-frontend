import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../model/user.model";
import { Department } from "../model/department.model";

  const BACKEND_URL = 'http://localhost:8080/get';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService{

  constructor(private http: HttpClient,private auth: AuthService, private router: Router) {}


getDepartmentsName(): Observable<Department[]>{
const token= this.auth.getAuthToken();
    return this.http.get<Department[]>( `${BACKEND_URL }/departments`,{
    headers: { Authorization: `Basic ${token}` }
  });
}

}