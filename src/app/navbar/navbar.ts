import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Role } from '../model/roles.enum';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  role: Role | null = null;

  constructor(private auth: AuthService, private router: Router) {
    this.role = this.auth.getRole();
  }

  canAccessUsers(): boolean {
    return this.role === 'Admin' || this.role === 'Department_Manager';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
