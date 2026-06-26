import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * GuestGuard ensures that already authenticated users cannot access guest-only routes
 * like the Login or Register pages. If they are already logged in, they are bounced
 * back to the main dashboard.
 */
export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  // Already logged in, redirect to the dashboard
  return router.createUrlTree(['/']);
};
