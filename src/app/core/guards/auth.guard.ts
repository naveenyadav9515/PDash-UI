import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * AuthGuard ensures that only authenticated users can access a route.
 * If the user is not logged in, they are redirected to the login page.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Not logged in, redirect to login page with the return url
  return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
};
