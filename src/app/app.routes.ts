import { Routes } from '@angular/router';
import { Login } from './login/login';
import { AuthGuard } from './guards/auth.guard';
import { Dashboard } from './dashboard/dashboard';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: Login,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: 'login' }
];
