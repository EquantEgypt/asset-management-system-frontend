import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { EmployeeDashboard } from './dashboards/employee-dashboard/employee-dashboard';
import { AdminDashboard } from './dashboards/admin-dashboard/admin-dashboard';
import { AuthGuard } from './Guards/auth.guard';
import { LoginGuard } from './Guards/login.guard';
import { RoleGuard } from './Guards/role.guard';
import { RoleType } from './model/RoleTypes';
import {ItDashboard} from './dashboards/it-dashboard/it-dashboard';
import { ManagerDashboard } from './dashboards/manager-dashboard/manager-dashboard';
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
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Employee'] as RoleType[] }
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboard,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] as RoleType[] }
  },
  {
    path: 'it-dashboard',
    component: ItDashboard,
    canActivate:[AuthGuard,RoleGuard],
    data: {roles: ['IT']as RoleType[]}

  },
  {
   path: 'manager-dashboard',
    component: ManagerDashboard,
    canActivate:[AuthGuard,RoleGuard],
    data: {roles: ['Department_Manager']as RoleType[]}
  },
  { path: '**', redirectTo: 'login' }
];
