import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { UserList } from '../user/list/user-list/user-list';
import { AssetList } from '../asset/list/asset-list/asset-list';
import { Role } from '../model/roles.enum';

@Component({
  selector: 'app-dashboard',
  imports: [UserList,AssetList,CommonModule , MatTableModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
    role: Role | null =null;
constructor(private auth:AuthService, private router: Router){}

 ngOnInit() { // Fixed: was "ngOnItit"
  console.log("this is te dashboard and the role is " , this.auth.getRole)
    this.role = this.auth.getRole(); 
  }
  //only admin or manager can access the top header 
  canAccessUsers(): boolean {
  return this.role === 'Admin' || this.role === 'Department_Manager';
}


activeTab: any= 'assets'; 
setActive(tab: 'assets' | 'users') {
    this.activeTab = tab;
}
 logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
