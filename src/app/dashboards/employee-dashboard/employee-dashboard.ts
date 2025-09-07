import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AssetsContainer } from '../../components/assets-container/assets-container';

@Component({
  selector: 'app-employee-dashboard',
  imports: [AssetsContainer],
  templateUrl: './employee-dashboard.html',
  styleUrl: './employee-dashboard.css'
})
export class EmployeeDashboard {
  constructor(private auth:AuthService, private router: Router){}
 logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
