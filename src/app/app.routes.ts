import { Routes } from '@angular/router';
import { Login } from './login/login';
import { AuthGuard } from './guards/auth.guard';
import { Dashboard } from './dashboard/dashboard';
import { Role } from './model/roles.enum';
import { AddAssetComponent } from './asset/add/add-asset';
import { AddRequestComponent } from './request/add/add-request.component';
import { RequestListComponent } from './request/list/request-list.component';
import { AssetDetails } from './asset-details/asset-details';
import { AssetHistory } from './asset-history/asset-history';
export const routes: Routes = [
  { path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full' },
  {
    path: 'login',
    component: Login,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.EMPLOYEE, Role.MANAGER, Role.IT] }
  },
  {
    path: 'assets/add',
    component: AddAssetComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] }
  },
  {
    path: 'request/add',
    component: AddRequestComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.EMPLOYEE, Role.MANAGER, Role.IT] }
  },
  {
    path: 'requests',
    component: RequestListComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.EMPLOYEE, Role.MANAGER, Role.IT] }
  },
  { path: 'assets/:id', 
    component: AssetDetails,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.EMPLOYEE, Role.MANAGER, Role.IT] }
  },
   { path: 'history/:id', 
    component: AssetHistory,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.MANAGER, Role.IT] }

  },
  { path: '**', redirectTo: 'dashboard' },
];