//#region Imports
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';
//#endregion

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  console.log({ status: authService.authStatus() });
  if (authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }
  // const url = state.url;
  // localStorage.setItem('url', url);
  const router = inject(Router);
  router.navigateByUrl('/auth/login', { replaceUrl: true });
  return false;
};
