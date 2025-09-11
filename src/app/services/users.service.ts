import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../model/user.model";

  const BACKEND_URL = 'http://localhost:8080/get/users';

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private http: HttpClient,private auth: AuthService, private router: Router) {}


getUsers(page: number, size: number,username?:string): Observable<any>{
const token= this.auth.getAuthToken();
let url = `${BACKEND_URL }?page=${page}&size=${size}`;
    if (username && username.trim() !== '') {
      url += `&username=${encodeURIComponent(username)}`;
    }
    const header= new HttpHeaders().set("Authorization",`Bearer ${token}`)
    return this.http.get<any>(url,{
    headers: { Authorization: `Basic ${token}` }
  });
}

}