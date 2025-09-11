import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserList } from '../user/list/user-list/user-list';
import { AssetList } from '../asset/list/asset-list/asset-list';
import { Role } from '../model/roles.enum';

@Component({
  selector: 'app-dashboard',
  imports: [UserList, AssetList, CommonModule, MatTableModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard  implements OnInit {
  role: Role | null = null;
  activeTab: any= 'assets'; 

  constructor(private auth: AuthService, private router: Router) { }

setActive(tab: 'assets' | 'users') {
    this.activeTab = tab;
}
ngOnInit() {
    this.role = this.auth.getRole();
  }

  logout() {
    this.auth.logout();

    this.router.navigate(['/login']);
  }
}
