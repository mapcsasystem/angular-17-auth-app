import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (authService.authStatus() === AuthStatus.authenticated) {
    const router = inject(Router);
    router.navigateByUrl('/dashboard', { replaceUrl: true });
    return false;
  }

  return true;
};
