import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
constructor(private auth:AuthService, private router: Router){}
 logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
