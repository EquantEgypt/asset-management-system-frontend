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


getUsers(page: number, size: number): Observable<any>{
const token= this.auth.getAuthToken();
console.log('what i get is index' , page,'and pagesize is',size)
    const header= new HttpHeaders().set("Authorization",`Bearer ${token}`)
    return this.http.get<any>(`http://localhost:8080/get/users?page=${page}&size=${size}`,{
    headers: { Authorization: `Basic ${token}` }
  });
}

}