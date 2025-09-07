import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UsersContainer } from '../../components/users-container/users-container';
import { AssetsContainer } from '../../components/assets-container/assets-container';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-admin-dashboard',
  imports: [UsersContainer,AssetsContainer,CommonModule , MatTableModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class Dashboard {
  constructor(private auth: AuthService, private router: Router) { }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
