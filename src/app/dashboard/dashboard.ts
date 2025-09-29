import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { UserList } from '../user/list/user-list/user-list';
import { AssetList } from '../asset/list/asset-list/asset-list';
import { Role } from '../model/roles.enum';
import { AddRequestComponent } from '../request/add/add-request.component';

@Component({
  selector: 'app-dashboard',
  imports: [UserList,AssetList,CommonModule , MatTableModule,AddRequestComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  role: Role | null = null;
  activeTab: any= 'assets'; 
  showRequestModal = false;

  constructor(private auth: AuthService, private router: Router) { }

setActive(tab: 'allAssets' | 'users'| 'myAssets') {
    this.activeTab = tab;
}
ngOnInit() {
    this.role = this.auth.getRole();
  }
  toggleRequestModal() {
    this.showRequestModal = !this.showRequestModal;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
