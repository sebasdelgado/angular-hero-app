import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { map, Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

const checkAuthStatus = (): Observable<boolean> => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => {
        if( isAuthenticated ) {
          router.navigateByUrl('./')
        }
      }),
      map( isAuthenticated => !isAuthenticated )
    )
}

export const publicCanActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, state: RouterStateSnapshot
) => {

return checkAuthStatus();
};

export const publicCanMatchGuard: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => {
console.log('CanMatch');
console.log({ route, segments });

return checkAuthStatus();
};
