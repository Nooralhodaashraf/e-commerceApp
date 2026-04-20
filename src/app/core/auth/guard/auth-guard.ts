import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const pLATFORM_ID = inject(PLATFORM_ID);
  //orders --checkout--wishlist--cart

  if (isPlatformBrowser(pLATFORM_ID)) {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return router.parseUrl('/login');
    }
  }
  return true;
};
