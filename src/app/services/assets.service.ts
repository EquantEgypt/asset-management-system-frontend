// asset.service.ts
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class AssetService {
  constructor(private auth: AuthService, private router: Router) {}


}


 