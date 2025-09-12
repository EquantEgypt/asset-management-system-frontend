import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../model/user.model";

const BACKEND_URL = 'http://localhost:8080/get/users';
 interface Page<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) { }


  getUsers(page: number, size: number, searchWord?: string, departmentId?: number | '',filteredRole?:string|''): Observable<Page<User>> {
    const token = this.auth.getAuthToken();

    let params=new HttpParams().set('page',page).set('size',size);
    if (searchWord && searchWord.trim() !== '') {
     params=params.set('search',searchWord);
    }

    if (filteredRole && filteredRole.trim() !== '') {
     params=params.set('role',filteredRole);
    }
    if (departmentId !== '' && departmentId !== null && departmentId !== undefined) {
           params=params.set('departmentId',departmentId);
    }
    return this.http.get<Page<User>>(`${BACKEND_URL}`, {
      headers: { Authorization: `Basic ${token}` },
      params
    });
  }
}