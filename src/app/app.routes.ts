import { Routes } from '@angular/router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './auth/guards';

export const routes: Routes = [
  //#region Paths Auth
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then((c) => c.AuthComponent),
    canActivate: [isNotAuthenticatedGuard],
    children: [
      {
        path: 'login',
        title: 'Login',
        loadComponent: () =>
          import('./auth/pages/login-page/login-page.component').then(
            (c) => c.LoginPageComponent
          ),
      },
      {
        path: 'register',
        title: 'Registrar',
        loadComponent: () =>
          import('./auth/pages/register-page/register-page.component').then(
            (c) => c.RegisterPageComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  //#endregion

  //#region Paths Dashboard
  {
    path: 'dashboard',
    title: 'Dashboard',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  //#endregion
  {
    path: '**',
    redirectTo: 'auth',
  },
];
