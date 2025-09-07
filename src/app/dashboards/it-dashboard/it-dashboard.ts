import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-it-dashboard',
  imports: [],
  templateUrl: './it-dashboard.html',
  styleUrl: './it-dashboard.css'
})
export class ItDashboard {
constructor(private auth :AuthService,private router:Router ){}
logout (){
  this.auth.logout;
  this.router.navigate(['/login']);
}
}
