import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = this.authService.getRole();

    const withRole = route.data['withRole'];

    if (!role) {
      this.router.navigate(['/login']);
      return false;
    }

    const ok =
      (withRole === 'empleado' && (role === 'empleado' || role === 'admin')) ||
      (withRole === 'admin' && role === 'admin');

    if (ok) return true;

    this.router.navigate(['/home']);
    return true;
  }
}
