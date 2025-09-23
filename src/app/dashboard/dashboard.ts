import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { UserList } from '../user/list/user-list/user-list';
import { AssetList } from '../asset/list/asset-list/asset-list';
import { Role } from '../model/roles.enum';
import { AddRequestComponent } from '../request/add/add-request.component';
import { RequestsList } from '../request/requests-list/requests-list';

@Component({
  selector: 'app-dashboard',
  imports: [UserList, AssetList, CommonModule, MatTableModule],
  imports: [UserList,AssetList,CommonModule , MatTableModule,AddRequestComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  role: Role | null = null;
  activeTab: string = 'assets';
  isCollapsed = false;
  isAdmin = false;
  isEmployee = false;


  constructor(private auth: AuthService, private router: Router) { }


  ngOnInit() {
    this.role = this.auth.getRole();
    this.isAdmin = this.auth.isAdmin();
    this.isEmployee = this.auth.isEmployee();

  }
  toggleRequestModal() {
    this.showRequestModal = !this.showRequestModal;
  }
  toggleRequestModal() {
    this.showRequestModal = !this.showRequestModal;
  }
  toggleRequestModal() {
    this.showRequestModal = !this.showRequestModal;
  }


  logout() {
    this.auth.logout();
  }



  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  setActive(tab: string) {
    this.activeTab = tab;
  }
}
