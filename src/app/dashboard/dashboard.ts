import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { UserList } from '../user/list/user-list/user-list';
import { AssetList } from '../asset/list/asset-list/asset-list';

@Component({
  selector: 'app-dashboard',
  imports: [UserList,AssetList,CommonModule , MatTableModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  constructor(private auth: AuthService, private router: Router) { }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
