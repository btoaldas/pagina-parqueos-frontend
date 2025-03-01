import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = localStorage.getItem('authRole');

    const withRole = route.data['withRole'];

    if (!role) {
      this.router.navigate(['/login']);
      return false;
    }

    if (withRole === 'empleado') return role === 'empleado' || role === 'admin';
    if (withRole === 'admin') return role === 'admin';
    if (withRole === 'cliente') return true;

    return false;
  }
}
