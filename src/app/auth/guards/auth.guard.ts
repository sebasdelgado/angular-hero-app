import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

const checkAuthStatus = (): Observable<boolean> => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('Authenticated', isAuthenticated)),
      tap( isAuthenticated => {
        if( !isAuthenticated ) {
          router.navigateByUrl('/auth/login');
        }
      })
    )

}

export const AuthCanActivateGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ) => {

  return checkAuthStatus();
};

export const AuthCanMatchGuard: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => {
  console.log('CanMatch');
  console.log({ route, segments });

  return checkAuthStatus();
};
