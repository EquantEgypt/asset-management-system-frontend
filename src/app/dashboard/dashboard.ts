import { Component, ViewChild } from '@angular/core';
import { AssetList } from '../asset/list/asset-list/asset-list';
import { UserList } from '../user/list/user-list/user-list';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Role } from '../model/roles.enum';

@Component({
  selector: 'app-dashboard',
  imports: [UserList, AssetList, CommonModule, MatTableModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  role: Role | null = null;
  activeTab: 'assets' | 'users' = 'assets';

  @ViewChild(AssetList) assetListComponent!: AssetList;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.role = this.auth.getRole();
  }

  canAccessUsers(): boolean {
    return this.role === 'Admin' || this.role === 'Department_Manager';
  }

  setActive(tab: 'assets' | 'users') {
  this.activeTab = tab;
  if (tab === 'assets') {

    setTimeout(() => {
      this.assetListComponent?.loadAssets();
    });
  }
}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
