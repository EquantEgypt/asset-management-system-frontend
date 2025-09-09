import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../model/user.model";


@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private http: HttpClient,private auth: AuthService, private router: Router) {}


getUsers(): Observable<User[]>{
const token= this.auth.getAuthToken();
    const header= new HttpHeaders().set("Authorization",`Bearer ${token}`)
    return this.http.get<User[]>('http://localhost:8080/get/users',{
    headers: { Authorization: `Basic ${token}` }
  });
}
}