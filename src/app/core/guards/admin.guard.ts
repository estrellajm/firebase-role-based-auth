import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map((user) => (user && user.roles.admin ? true : false)),
      tap((isAdmin: boolean) => {
        if (!isAdmin) {
          console.error('Access denied - Admins only');
        }
      })
    );
  }
}
