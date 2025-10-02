import { Routes } from '@angular/router';
import { Login } from './login/login';
import { AuthGuard } from './guards/auth.guard';
import { Dashboard } from './dashboard/dashboard';
import { Role } from './model/roles.enum';
import { AddAssetComponent } from './asset/add/add-asset';
import { AssignAssetForm } from './assign-asset-form/assign-asset-form';
import { AssetHistory } from './asset-history/asset-history';
import { AssetDetails } from './asset-details/asset-details';
import { UpdateAssetComponent } from './asset/update/update-asset';
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

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
    path: 'asset-assignments',
    component: AssignAssetForm,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.MANAGER, Role.IT] }
  },
    { path: 'assets/:id', 
    component: AssetDetails,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.EMPLOYEE, Role.MANAGER, Role.IT] }
  },
  {
    path: 'assets/update/:id',
    component: UpdateAssetComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN] }
  },
   { path: 'history/:id', 
    component: AssetHistory,
    canActivate: [AuthGuard],
    data: { roles: [Role.ADMIN, Role.MANAGER, Role.IT] }

  },
  { path: '**', redirectTo: 'dashboard' }
];
