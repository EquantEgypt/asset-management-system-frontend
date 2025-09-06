import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard {
constructor(private auth:AuthService, private router: Router){}
 logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
