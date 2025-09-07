import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manager-dashboard',
  imports: [],
  templateUrl: './manager-dashboard.html',
  styleUrl: './manager-dashboard.css'
})
export class ManagerDashboard {
constructor(private auth :AuthService,private router:Router ){}
logout (){
  this.auth.logout;
  this.router.navigate(['/login']);
}
}
