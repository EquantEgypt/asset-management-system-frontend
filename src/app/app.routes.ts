import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { EmployeeDashboard } from './components/employee-dashboard/employee-dashboard';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { AuthGuard } from './Guards/auth.guard';
import { LoginGuard } from './Guards/login.guard';
import { RoleGuard } from './Guards/role.guard';
import { RoleType } from './types/RoleTypes';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: Login,
    canActivate: [LoginGuard]  
  },
  {
    path: 'employee-dashboard',
    component: EmployeeDashboard,
    canActivate: [AuthGuard , RoleGuard ] ,
    data: { roles: [RoleType.EMPLOYEE] }
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [AuthGuard , RoleGuard]   ,
    data: { roles: [RoleType.ADMIN] }
  },
  { path: '**', redirectTo: 'login' }
];
